from nyct_gtfs import NYCTFeed
import requests
import nyct_gtfs.compiled_gtfs.gtfs_realtime_pb2 as gtfs__realtime__pb2


# print("feed" , feed)

# headers = {"x-api-key": 'hpATzat4xP9hqcoU36qW33JHMOEgPdTB4yOC1sKt' }
# response = requests.get("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts",headers=headers)
# print("response is ", response.content)
#
# # print(response.content)




# Load the realtime feed from the MTA site
feed = NYCTFeed("1", api_key="hpATzat4xP9hqcoU36qW33JHMOEgPdTB4yOC1sKt")
print("feed is ", feed)
trains = feed.trips
print("the value of trains is ", trains)