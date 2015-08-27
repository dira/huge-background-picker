require 'rubygems'
require 'rack'
require './lib/rack_haml_sass_generator'

require 'rack/rewrite'
use Rack::Rewrite do
  rewrite "/", "/index.html"
end

use Rack::SiteGenerator #haml
use Rack::Static, :urls => ["/"], :root => "public"
run lambda { |env| []}
