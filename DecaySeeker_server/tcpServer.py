# 导入 socket、sys 模块
import socket
import sys
import json
import pandas as pd
import pymysql
host = '1.15.106.25'
port = 3306
db = 'MothSeeker'
user = 'root'
password = 'Admin_Password741'


# ---- 用pymysql 操作数据库
def get_connection():
    conn = pymysql.connect(host=host, port=port, db=db, user=user, password=password)
    return conn

conn = get_connection()


def getRecordNoByToken(token):
    # 获取游标
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM check_record WHERE TOKEN='+str(token))
    record = cursor.fetchone()
    cursor.close()
    return record[0]

def changeStatus(record_no):
    try:
        # 获取游标
        cursor = conn.cursor()
        cursor.execute('UPDATE check_record SET status=1 WHERE id='+str(record_no))
        cursor.close()
        return True
    except:
        return False

def uploadData(sendMsg):
    record_no = getRecordNoByToken(sendMsg['clientToken'])
    print(record_no)
    print(changeStatus(record_no))
    upload_params = sendMsg['params']
    upload_params_json = json.dumps(upload_params)
    upload_csv = pd.read_json(upload_params_json)
    upload_csv.to_csv("database/data/"+str(record_no)+".csv")

# 创建 socket 对象
serversocket = socket.socket(
    socket.AF_INET, socket.SOCK_STREAM)

# 获取本地主机名
host = '10.0.4.9'

port = 8848

# 绑定端口号
serversocket.bind((host, port))

# 设置最大连接数，超过后排队
serversocket.listen(5)

while True:
    # 建立客户端连接
    clientsocket, addr = serversocket.accept()
    print("连接地址: %s" % str(addr))
    record_data = []
    recvMsg = clientsocket.recv(1024)
    recvMsg = recvMsg.decode('utf-8')
    recvMsgJson = json.loads(recvMsg)
    print(recvMsgJson)
    clientsocket.close()
    uploadData(recvMsgJson)