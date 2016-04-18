import os
from shapely.geometry import Point, mapping
from fiona import collection
from fiona.crs import from_epsg
import csv
from collections import Counter
import time

epsg = from_epsg(4326)

stops = "gtfs/stops.txt"
stop_times = "gtfs/stop_times.txt"
out_stop_file = "data/stops_2.geojson"

geo_format = "GeoJSON"

super_list = []

with open(stop_times, 'rb') as f:
    reader = csv.DictReader(f)
    for row in reader:
        # 16M_S is for a weekday in Montreal gtfs
        if "16M_S" in row['trip_id']:
            super_list.append(row['stop_id'])

freq_list = Counter(super_list)

for item in freq_list.items():
    print item[0],item[1]

geo_schema = { 'geometry': 'Point',
                'properties': {
                        'frequency':'int'
                    } }

count = 0

with collection (out_stop_file, "w", driver=geo_format, crs=epsg, schema=geo_schema) as output:
    with open(stops, 'rb') as f:
        reader = csv.DictReader(f)
        for row in reader:
            point = Point(float(row['stop_lon']), float(row['stop_lat']))

            for item in freq_list.items():
                if item[0] == row['stop_id']:
                    f = item[1]
                    count += 1

            output.write({
                'properties': {
                    'frequency': f
                },
                'geometry': mapping(point)
            })

print("that was fun!")
