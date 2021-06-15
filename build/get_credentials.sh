#!/bin/bash
cd build

export project_id=$1
export environment=$2

sed -i "s/<project_id>/${project_id}/g"  ../app.flexible.yaml
sed -i "s/<environment>/${environment}/g"  ../app.flexible.yaml