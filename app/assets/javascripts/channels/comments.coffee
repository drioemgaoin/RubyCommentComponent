jQuery(document).on 'turbolinks:load', ->
  App.comment = App.cable.subscriptions.create "CommentChannel",
    connected: ->
      # Called when the subscription is ready for use on the server
      console.log("CONNECTED----")

    disconnected: ->
      # Called when the subscription has been terminated by the server
      console.log("DISCONNECTED----")

    received: (data) ->
      # Called when there's incoming data on the websocket for this channel
      document.getElementById("display-comment").add(data.comment)
