(function() {
  $scope.destaques = []

  var rl = {

    pushMessage: function pushMessage() {
      // redelivre
      var wrappedDialog = AppMessagesManager.wrapForDialog(dialog.top_message, dialog)

      if (isDestaque(wrappedDialog)) {

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
        // check id
        if (peer.peerID == destaques[i]) {
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
    }
  };

   window.radarLib = rl;
})()