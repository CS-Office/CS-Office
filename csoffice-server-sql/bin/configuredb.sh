#!/bin/bash

database='csofficedb'

echo "Configuring database: $database"

dropdb -U csoffice19 csoffice19
createdb -U csoffice19 csoffice19

psql -U csoffice19 csofficedb < ./bin/sql/csoffice.sql

echo "$database configured"