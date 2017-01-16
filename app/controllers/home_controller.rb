class HomeController < ApplicationController
  def index
    @comments = CommentService.new().get_all
  end
end
