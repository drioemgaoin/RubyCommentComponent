jQuery(document).on 'ready', ->
  App.comment = App.cable.subscriptions.create "CommentChannel",
    connected: ->
      console.log("Connected to the channel CommentChannel")

    disconnected: ->
      console.log("Disconnected to the channel CommentChannel")

    received: (data) ->
      $("#display-comment")[0].add(data.comment)
