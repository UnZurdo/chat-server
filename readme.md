## Intro

Internal map server, using tileserver-gl

The mbtiles file should be placed in _./data_

Test server: http://46.101.47.249:8081/data/v3/#5.49/41.251/-4.405

## RUN

```
docker-compose up

```

## Routes

```
# Map tiles
http://IP_SERVER:8081/data/v3/{z}/{x}/{y}

# Serve Static files
IP_SERVER:3001/styles/osm-bright/sprite.json
IP_SERVER:3001/styles/osm-bright/sprite.png
IP_SERVER:3001/style.json

```

## References

- OpenMapTiles: https://openmaptiles.org/
- OpenMaptile-server: https://openmaptiles.com/server/

- Maputnik(editor): https://maputnik.github.io/editor/#4.06/41.68/3.11

- Maptiler (tile server): https://www.maptiler.com/download/)

- Download mapstiles: https://openmaptiles.com/downloads/

## Resources consumed

```
docker stats --no-stream

```

```
CONTAINER ID        NAME                                    CPU %               MEM USAGE / LIMIT     MEM %               NET I/O             BLOCK I/O           PIDS
ec68fa8877a6        mapbox-sandbox-master_mapbox-server_1   0.00%               41.63MiB / 1.952GiB   2.08%               9.26kB / 4.15kB     16.4kB / 8.19kB     21
6d9e166340ac        mapbox-sandbox-master_tileserver-gl_1   0.06%               72.14MiB / 1.952GiB   3.61%               199kB / 6.69MB      49.2kB / 0B         18

```
