-- SET UP --
run rethinkdb.exe like
rethinkdb --http-port 8081
yarn in both client and server dirs
yarn start in both dirs
http://localhost:3000/ will be clinet 
http://localhost:8081 will be rethink amdin GUI
create a database painter
create a tables - drawings and lines

-- VALIDATE --

create few drawintgs - paint1, paint2 etc
click on the paint1create a smiley drawings

go to admin console data explorer and excute following commands -
r.db('painter').table('drawings')
r.db('painter').table('lines')
for both when you click run you should see some output data.
