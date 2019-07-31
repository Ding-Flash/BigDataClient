
# 安装python3.6
yum install https://centos6.iuscommunyum install https://centos6.iuscommunity.org/ius-release.rpm -y
yum install python36u -y
ln -s /usr/bin/python3.6 /bin/python3ity.org/ius-release.rpm -y

# 安装pip3
yum install python36u-pip -y
ln -s /usr/bin/pip3.6 /bin/pip3

# 安装nodejs
yum install nodejs
yum install npm

# 安装python包依赖
pip install -r requirements.txt

spark.eventLog.enabled true
spark.eventLog.dir file:/home/yangs/env/spark-2.3.3-bin-hadoop2.7/tsee_log

spark.driver.extraJavaOptions -javaagent:$BYTEMAN_HOME/byteman.jar=script:$BigData/master_trace.btm -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=9999 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false
spark.executor.extraJavaOptions -javaagent:$BYTEMAN_HOME/lib/byteman.jar=script:$BigData/slave_trace.btm -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=9999 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false


cd $BigData
python3 main.py

