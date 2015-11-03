# # Copyright (C) 2015 Google Inc.,
# Created By: sasmita@google.com
# Maintained By: sasmita@google.com

from flask import Flask, make_response, jsonify, render_template, request, send_from_directory, redirect
from google.appengine.api import users

app = Flask(__name__)
app.config['DEBUG'] = True

# Note: We don't need to call run() since our application is embedded within
# the App Engine WSGI application server.

systems = [
	{
		'id': 1,
		'title': u'Mac book pro 1',
		'description': u'Mac book build2012, serial number#12345678', 
		'slug': "mac-1",
		'pcontact': "user@example.com",
		'scontact': "user@example.com",
		'done': False
	},
	{
		'id': 2,
		'title': u'Mac book pro 2',
		'description': u'Mac book build2012, serial number#12345678a', 
		'slug': "mac-2",
		'pcontact': "user@example.com",
		'scontact': "user@example.com",
		'done': False
	}
]

@app.route('/')
def hello():
    """Return a friendly HTTP greeting."""
    user = users.get_current_user()
    if user:
    	return render_template('sample.html')
    else:
    	return redirect(users.create_login_url(request.url_root))
    #return 'Hello World! welcome!'
    #return render_template('sample.html')
    #fp = open('./templates/testAngularjs.html')
    #read_data = fp.read()
    #fp.close()
    #return read_data
    #return send_from_directory('templates', 'testAngularjs.html')

#@app.route('/data')	
#def data():
#	return data.txt
@app.route('/<path:filename>')
def get_file(filename):
	return send_from_directory('static', filename)

@app.route('/sample/api/v1.0/systems', methods=['GET'])
def get_systems():
	return jsonify({'systems': systems})

#get a file with get
@app.route('/sample/api/v1.0/<path:filename>', methods=['GET'])
def get_file_get(filename):
	return send_from_directory('static', filename)

@app.route('/sample/api/v1.0/systems/<int:system_id>', methods=['GET'])
def get_system(system_id):
	system = [system for system in systems if system['id'] == system_id]
	if len(system) == 0:
		abort(404)
	return jsonify({'systems': system[0]})

@app.route('/sample/api/v1.0/systems', methods=['POST'])
def create_system():
	#print request
	#print request.json
	if not request.json or not 'title' in request.json:
		#return #abort(400)
		abort
	system = {
		'id': systems[-1]['id'] + 1,
		'title': request.json['title'],
		'description': request.json.get('description', ""),
		'slug': request.json.get('slug', ""),
		'pcontact': request.json.get('pcontact', ""),
		'scontact': request.json.get('scontact', ""),
		'done': False
	}
	systems.append(system)
	return jsonify({'system': system}), 201


@app.route('/sample/api/v1.0/systems/<int:system_id>', methods=['PUT'])
def update_system(system_id):
    system = [system for system in systems if system['id'] == system_id]
    if len(system) == 0:
        abort(404)
    if not request.json:
        abort(400)
    if 'title' in request.json and type(request.json['title']) != unicode:
        abort(400)
    if 'description' in request.json and type(request.json['description']) is not unicode:
        abort(400)
    if 'done' in request.json and type(request.json['done']) is not bool:
        abort(400)
    system[0]['title'] = request.json.get('title', system[0]['title'])
    system[0]['description'] = request.json.get('description', system[0]['description'])
    system[0]['slug'] = request.json.get('slug', system[0]['slug'])
    system[0]['pcontact'] = request.json.get('pcontact', system[0]['pcontact'])
    system[0]['scontact'] = request.json.get('scontact', system[0]['scontact'])
    system[0]['done'] = request.json.get('done', system[0]['done'])
    return jsonify({'system': system[0]})

@app.route('/sample/api/v1.0/systems/<int:system_id>', methods=['DELETE'])
def delete_system(system_id):
    system = [system for system in systems if system['id'] == system_id]
    if len(system) == 0:
        abort(404)
    systems.remove(system[0])
    return jsonify({'result': True})

@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, nothing at this URL.', 404


#@app.errorhandler(404)
#def not_found(error):
#	return make_response(jsonify({'error': 'Not found'}), 404)
