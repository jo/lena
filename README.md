Lena
====

Slick minimalistic Content Management System for artists and others.


Prerequisites
-------------

* make
* ruby
* ruby-json
* curl
* imagemagick


Installation
------------

I assume you have a working CouchDB installation Version 1.1.1 or newer.


# Configure CouchDB

Allow JSONP:
  curl -XPUT http://user:pw@localhost:5984/_config/httpd/allow_jsonp -H "Content-Type: application/json" -d '"true"'

Routing:
  curl -XPUT http://user:pw@localhost:5984/_config/vhosts/lena.localhost -H "Content-Type: application/json"  -d '"/lena/_design/lena/_rewrite"'


# Setup Master Database

Create Database:
  make create URL=http://user:pw@localhost:5984/lena

Build and install the lena application:
  make URL=http://user:pw@localhost:5984/lena

And you're done: http://lena.localhost:5984

# Login with a wink
[http://lena.localhost:5984/;)](http://lena.localhost:5984/;%29)


(c) 2012 Johannes J. Schmidt, TF, Berlin
