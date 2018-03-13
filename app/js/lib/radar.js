(function() {
  var destaques = [
    'midianinja',
    // '268468281'
    'hackersbrasil'
  ];

  var dObj = {
    midianinja: {
      type: 'channel',
    },
    hackersbrasil: {
      type: 'channel' // supergroup channel is like channell on join
    },
    268468281: {
      type: 'group',
      hash: 'H9gqbxAAgDniaui2COxOpQ'
    }
  };

  var rl = {
    pushMessage: function pushMessage(
      $scope, AppMessagesManager, dialog
    ) {
      // redelivre
      var wrappedDialog = AppMessagesManager.wrapForDialog(dialog.top_message, dialog)

      if (rl.isDestaque(wrappedDialog)) {

        for (var i = 0; i < $scope.destaques.length; i++) {
          if (
            $scope.destaques[i].peerID == wrappedDialog.peerID
          ) {
            // skip if already added
            return;
          }
        }
        $scope.destaques.unshift(wrappedDialog)
      } else {
        $scope.dialogs.unshift(wrappedDialog)
      }
    },

    isDestaque: function isDestaque(peer) {

      for (var i = 0; i < destaques.length; i++) {
      // console.log('>peer>', peer.peerID, destaques[i]);

        // check id
        if (peer.peerID == destaques[i]) {
          return true
        }
        // check if is group:
        if (peer.peerID == (-destaques[i]) ) {
          return true
        }
        // check name
        if (
          peer.peerData &&
          ( peer.peerData.username == destaques[i] )
        ) {
          return true
        }
      }
      // default false
      return false
    },

    startRadarModal: function startRadarModal($modal, templateUrl) {
      setTimeout(function(){
          // modal da rede livre que aparece depois do login
          var modalHello = $modal.open({
            templateUrl: templateUrl('radar_welcome_modal'),
            controller: 'RedelivreWelcomeModalControler',
            windowClass: 'redelivre_welcome_modal_window mobile_modal',
            backdrop: 'single'
          })
      }, 2000)
    },

    addUserIn: function addUserIn(MtpApiManager, AppPeersManager, AppChatsManager, ApiUpdatesManager, $rootScope) {
      destaques.forEach(function(destaque) {
        // adiciona o usuário atual nos grupos da redeLivre
        MtpApiManager.getUserID().then(function (id) {
            // console.log('id>', id);
            // console.log('destaque>', destaque);
            // console.log('peerID>', peerID);

            var type = dObj[destaque].type;

              // console.log('Enter in group>', destaque, dObj[destaque]);

            if (type == 'channel') {
              AppPeersManager.resolveUsername(destaque)
              .then(function(peerID) {
                MtpApiManager.invokeApi('channels.joinChannel', {
                  channel: AppChatsManager.getChannelInput(-peerID)
                }).then(function (result) {
                  ApiUpdatesManager.processUpdateMessage(result)
                });
              });
            } else if( type == 'group') {
              // console.log('Enter in group>', destaque, dObj[destaque]);
              var hash = dObj[destaque].hash;

              return MtpApiManager.invokeApi('messages.checkChatInvite', {
                hash: hash
              }).then(function (chatInvite) {
                var chatTitle
                if (chatInvite._ == 'chatInviteAlready') {
                  AppChatsManager.saveApiChat(chatInvite.chat)
                  var canJump = !chatInvite.chat.pFlags.left ||
                    AppChatsManager.isChannel(chatInvite.chat.id) && chatInvite.chat.username
                  if (canJump) {
                    return $rootScope.$broadcast('history_focus', {
                      peerString: AppChatsManager.getChatString(chatInvite.chat.id)
                    })
                  }
                  chatTitle = chatInvite.chat.title
                } else {
                  chatTitle = chatInvite.title
                }

                  return MtpApiManager.invokeApi('messages.importChatInvite', {
                    hash: hash
                  }).then(function (updates) {
                    ApiUpdatesManager.processUpdateMessage(updates)

                    if (updates.chats && updates.chats.length == 1) {
                      $rootScope.$broadcast('history_focus', {
                        peerString: AppChatsManager.getChatString(updates.chats[0].id)
                      })
                    }
                    else if (updates.updates && updates.updates.length) {
                      for (var i = 0, len = updates.updates.length, update; i < len; i++) {
                        update = updates.updates[i]
                        if (update._ == 'updateNewMessage') {
                          $rootScope.$broadcast('history_focus', {
                            peerString: AppChatsManager.getChatString(update.message.to_id.chat_id)
                          })
                          break
                        }
                      }
                    }
                  })
              });
            }
        })
      });
    }
  };

  window.radarLib = rl;
})()