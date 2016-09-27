task :build do
  puts "## Building site"
  system "bundle exec middleman build"
end

# MadTree Redesign URL
production_url = "https://madtree-redesign.herokuapp.com/"

# Deploys to Heroku
multitask :heroku do
  puts "## Deploying to Production"
  puts "\n## Pushing to #{production_url}"
  system "git push heroku master"
end

namespace :heroku do
  desc "Push source to Heroku production and build"
    task :deploy => [:heroku] do
  end
end

namespace :assets do
  task :precompile do
    sh "bundle exec middleman build"
  end
end
