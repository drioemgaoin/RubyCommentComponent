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
    sh "#{app.config.root}/node_modules/webpack/bin/webpack.js -p --config #{app.config.root}/webpack.config.js --progress"
  end

  task :clobber do
    rm_rf "#{app.config.root}/app/assets/javascripts/{bundle.js}"
  end
end
