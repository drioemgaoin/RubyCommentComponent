require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    stub_request(:get, "localhost:3000/comments")
    uri = URI.parse("http://localhost:3000/comments")
    get home_index_url
    assert_response :success
  end

  def locate(address)
    escaped_address = URI.escape(address)
    URI.parse(escaped_address)
  end

end
