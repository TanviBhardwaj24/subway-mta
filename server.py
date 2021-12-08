from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin
from nyct_gtfs import NYCTFeed

app = Flask(__name__)


@app.route("/")
def mainPage():
    return render_template('welcome.html')

@app.route('/uptime')
def my_form():
    return render_template('uptime.html')

@app.route('/uptime', methods=['POST'])
def my_form_post():
    text = request.form['text'].upper()
    feed = NYCTFeed(text, api_key="hpATzat4xP9hqcoU36qW33JHMOEgPdTB4yOC1sKt")
    print(feed.trips)
    for trip in feed.trips:
        delay_alert = trip.has_delay_alert
        start_time = trip.departure_time
        end_time = trip.last_position_update

        total = 0
        if end_time is None:
            total = start_time
        else:
            total = end_time - start_time
        print("delay alert ", delay_alert)
        print("total time is ", total)
        print("start time is ", start_time)
        print("end time is ", end_time)
        if delay_alert == False:
            result = f"The train has been running for {total} and the uptime is 1 since the total time delayed is 0"
        else:
            result = f"The train has been running for {total}"
    return result

if __name__ == '__main__':
     app.run(port=5002)