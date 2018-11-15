from flask import Flask
from flask import jsonify
from flask import make_response
from flask import request
import json

from BarBeerDrinker import database
app = Flask(__name__)

@app.route('/api/bar', methods=["GET"])
def get_bars():
    return jsonify(database.get_bars())

@app.route("/api/bar/<name>", methods=["GET"])
def find_bar(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified.")
        bar = database.find_bar(name)
        if bar is None:
            return make_response("no bar found with given name.", 404)
        return jsonify(bar)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/bar/<name>/top10spenders", methods=["GET"])
def find_bar_top10spenders(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified.")
        bar = database.find_bar_top10spenders(name)
        if bar is None:
            return make_response("no bar found with given name", 404)
        return jsonify(bar)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/beer/<name>/top10Bars", methods=["GET"])
def find_beer_top10Bars(name):
    try:
        if name is None:
            raise ValueError("Beer is not specified.")
        beer = database.find_beer_top10Bars(name)
        if beer is None:
            return make_response("no beer found with given name", 404)
        return jsonify(beer)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/beer', methods=["GET"])
def get_beers():
    return jsonify(database.get_beers())

@app.route("/api/beer/<name>", methods=["GET"])
def find_beer(name):
    try:
        if name is None:
            raise ValueError("Beer is not specified.")
        beer = database.find_beer(name)
        if beer is None:
            return make_response("no beer found with given name.", 404)
        return jsonify(beer)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/beer/<name>/top10Drinkers", methods=["GET"])
def find_beer_top10Drinkers(name):
    try:
        if name is None:
            raise ValueError("Beer is not specified.")
        beer = database.find_beer_top10Drinkers(name)
        if beer is None:
            return make_response("no beer found with given name", 404)
        return jsonify(beer)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)
@app.route("/api/bar/<name>/<day>/top10Beers", methods=["GET"])
def find_bar_top10Bars(name, day):
    try:
        if name is None:
            raise ValueError("Bar is not specified.")
        bar = database.find_bar_top10Beers(name, day)
        if day is None: 
            raise ValueError("Day is not specified.")
        if bar is None:
            return make_response("no bar found with given name", 404)
        return jsonify(bar)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/beer/<name>/timeDistribution", methods=["GET"])
def find_beer_timeDistribution(name):
    try:
        if name is None:
            raise ValueError("Beer is not specified.")
        beer = database.find_beer_timeDistribution(name)
        if beer is None:
            return make_response("no beer found with given name", 404)
        return jsonify(beer)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)
@app.route('/api/manf', methods=["GET"])
def get_manf():
    return jsonify(database.get_manf())

@app.route('/api/manf/<name>/top10Regions', methods=["GET"])
def find_manf_region_sales(name):
    try:
        if name is None:
            raise ValueError("Manf is not specified.")
        manf = database.find_manf_region_sales(name)
        if manf is None:
            return make_response("no manf found with given name", 404)
        return jsonify(manf)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/manf/<name>/top10RegionsLikes', methods=["GET"])
def find_manf_region_likes(name):
    try:
        if name is None:
            raise ValueError("Manf is not specified.")
        manf = database.find_manf_region_likes(name)
        if manf is None:
            return make_response("no manf found with given name", 404)
        return jsonify(manf)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)
@app.route("/api/bar/<name>/<day>/timeDistribution", methods=["GET"])
def find_bar_timeDistribution(name, day):
    try:
        if name is None:
            raise ValueError("Bar is not specified.")
        bar = database.find_bar_timeDistribution(name, day)
        if bar is None:
            return make_response("no bar found with given name", 404)
        return jsonify(bar)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)
@app.route("/api/bar/<name>/timeDistributionWeek", methods=["GET"])
def find_bar_timeDistributionWeek(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified.")
        bar = database.find_bar_timeDistributionWeek(name)
        if bar is None:
            return make_response("no bar found with given name", 404)
        return jsonify(bar)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)
@app.route("/api/bar/<name>/fractionInventory", methods=["GET"])
def find_bar_fractionInventory(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified.")
        bar = database.find_bar_fractionInventory(name)
        if bar is None:
            return make_response("no bar found with given name", 404)
        return jsonify(bar)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)
@app.route("/api/barAnalytics/<name>/<day>", methods=["GET"])
def find_bar_analytics(name, day):
    try:
        if name is None:
            raise ValueError("Bar is not specified.")
        bar = database.find_bar_analytics(name, day)
        if bar is None:
            return make_response("no Bar Analytics can be found", 404)
        return jsonify(bar)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)
@app.route("/api/beersOnly", methods=["GET"])
def beersOnly():
    beer = database.beersOnly()
    return jsonify(beer)