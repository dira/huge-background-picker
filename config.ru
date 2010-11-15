require 'rubygems'
require 'rack'
require 'lib/rack_haml_sass_generator'

use Rack::SiteGenerator #haml
use Rack::Static, :urls => ["/"], :root => "public"
run lambda { |env| []}
