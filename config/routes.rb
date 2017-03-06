Rails.application.routes.draw do
  get 'home/index'
  get 'home/polymer'
  get 'home/react'

  root 'home#index'
end
