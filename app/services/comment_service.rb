class CommentService
  include HTTParty

  base_uri "http://localhost:3000"

  def get_all
    response = self.class.get("/comments")
    if response.success?
      response.body
    else
      raise response.response
    end
  end

end
