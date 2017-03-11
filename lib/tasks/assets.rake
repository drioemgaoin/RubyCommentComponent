Rake::Task['assets:precompile']
  .clear_prerequisites
  .enhance(['assets:compile_environment'])

namespace :assets do
  # In this task, set prerequisites for the assets:precompile task
  task :compile_environment => :webpack do
    Rake::Task['assets:environment'].invoke
  end

  desc 'Compile assets with webpack'
  task :webpack do
    sh './node_modules/webpack/bin/webpack.js --config ./webpack.config.js -d'
  end

  task :clobber do
    rm_rf "#{app.config.root}/app/assets/javascripts/{bundle.js}"
  end
end
