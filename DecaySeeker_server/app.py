from flask import Flask
import pandas as pd
from flask import request, send_from_directory
import pymysql
import json
import os
import random
import time
from flask_cors import *

host = '1.15.106.25'
port = 3306
db = 'MothSeeker'
user = 'root'
password = 'Admin_Password741'

def ranstr(num):
    # 猜猜变量名为啥叫 H
    H = '0123456789'

    salt = ''
    for i in range(num):
        salt += random.choice(H)

    return salt

# ---- 用pymysql 操作数据库
def get_connection():
    conn = pymysql.connect(host=host, port=port, db=db, user=user, password=password)
    return conn

conn = get_connection()


def getCsv(signal, record_no):
    if(signal=="data"):
        database_pd = pd.read_csv("database/data/"+str(record_no)+".csv",index_col=0)
    elif (signal == "report"):
        database_pd = pd.read_csv("database/report/" + str(record_no) + ".csv",index_col=0)
    return database_pd
app = Flask(__name__)
CORS(app,supports_credentials=True)
'''
病患端接口：
createNewRecordById
getTokenByCheckNo
getAllRecordsNoByUserId
getDataByNo
getReportByNo
'''

@app.route("/createNewRecordById")
def createNewRecordById():
    # get the query args
    user_id = request.args.get("user_id")
    # 获取游标
    cursor = conn.cursor()
    token = ranstr(6)
    # 定义要执行的sql语句
    sql = 'insert into check_record(status,user_id,token) values(0,'+str(user_id)+','+token+');'

    # 拼接并执行sql语句
    cursor.execute(sql)

    # 涉及写操作要注意提交
    conn.commit()
    cursor.close()  # 先关闭游标
    response_json = {}
    response_json['signal'] = '200'
    response_json['token']=token
    res = json.dumps(response_json, ensure_ascii=False)
    return res

'''根据检查编号获取验证码'''
@app.route("/getTokenByCheckNo")
def getTokenByCheckNo():
    # get the query args
    record_no = request.args.get("record_no")

    # 获取游标
    cursor = conn.cursor()
    cursor.execute('SELECT token FROM CHECK_RECORD WHERE id='+str(record_no))
    token = cursor.fetchone()
    print(token)
    response_json = {}
    response_json['signal']='200'
    response_json['token']=token[0]
    cursor.close()  # 先关闭游标
    res = json.dumps(response_json, ensure_ascii=False)
    return res

'''根据用户id号获取该用户对应的所有记录Id'''
@app.route("/getAllRecordsNoByUserId")
def getAllRecordsNoByUserId():
    # get the query args
    user_id = request.args.get("user_id")

    # 获取游标
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM check_record WHERE user_id='+str(user_id))

    record_list = []
    while 1:
        record = cursor.fetchone()
        if record is None:
            # 表示已经取完结果集
            break
        print(type(record))
        temp_record = {}
        temp_record['id']=record[0]
        temp_record['status'] = record[1]
        temp_record['time'] = str(record[2])
        temp_record['user_id'] = record[3]
        record_list.append(temp_record)
    print(record_list)
    response_json = {}
    response_json['signal']='200'
    response_json['records']=record_list
    cursor.close()  # 先关闭游标
    res = json.dumps(response_json, ensure_ascii=False)
    return res

'''根据记录的ID号获取蛀牙的未处理过的数据'''
@app.route("/getDataByNo")
def getDataByNo():
    # get the query args
    record_no = request.args.get("record_no")
    database_pd = getCsv("data", record_no)
    print(database_pd)

    head_list = list(database_pd.columns)  # 拿到表头: [A, B, C, D]
    list_dic = []
    for i in database_pd.values:  # i 为每一行的value的列表：[a2, b2, c3, d2]
        i = i.tolist()
        a_line = dict(zip(head_list, i))
        list_dic.append(a_line)
    # 将 DataFrame  数据再次打包为 JSON 并传回
    response_json = {}
    response_json['signal'] = '200'
    response_json['data']=list_dic
    res = json.dumps(response_json, ensure_ascii=False)
    return res

@app.route("/getReportByNo")
def getReportByNo():
    # get the query args
    record_no = request.args.get("record_no")
    directory = os.getcwd()  # 假设在当前目录
    try:
        file = send_from_directory(directory, "database/report/"+str(record_no)+".pdf",as_attachment=True)
        return file
    except:
        response_json = {}
        response_json['signal'] = '200'
        return response_json

@app.route("/getVideoByNo")
def getVideoByNo():
    # get the query args
    record_no = request.args.get("record_no")
    directory = os.getcwd()  # 假设在当前目录
    try:
        file = send_from_directory(directory, "database/video/"+str(record_no)+".mp4",as_attachment=True)
        return file
    except:
        response_json = {}
        response_json['signal'] = '200'
        return response_json

'''
医生端接口：
'''

'''根据医生编号获取单个医生信息'''
@app.route("/getDoctorById")
def getDoctorById():
    # get the query args
    doctor_id = request.args.get("doctor_id")

    # 获取游标
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM doctors WHERE id='+str(doctor_id))
    doctor = cursor.fetchone()
    cursor.close()  # 先关闭游标
    print(doctor)
    doctor_dict = {}
    doctor_dict['id']=doctor[0]
    doctor_dict['name'] = doctor[1]
    doctor_dict['department'] = doctor[2]
    doctor_dict['field'] = doctor[3]
    doctor_dict['introduction'] = doctor[4]
    doctor_dict['phone'] = doctor[5]
    response_json = {}
    response_json['signal']='200'
    response_json['doctor']=doctor_dict

    res = json.dumps(response_json, ensure_ascii=False)
    return res

'''返回所有医生信息'''
@app.route("/getAllDoctors")
def getAllDoctors():
    # 获取游标
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM doctors')
    doctors = cursor.fetchall()
    cursor.close()  # 先关闭游标
    doctors_dict_list = []
    for doctor in doctors:
        doctor_dict = {}
        doctor_dict['id']=doctor[0]
        doctor_dict['name'] = doctor[1]
        doctor_dict['department'] = doctor[2]
        doctor_dict['field'] = doctor[3]
        doctor_dict['introduction'] = doctor[4]
        doctor_dict['phone'] = doctor[5]
        doctors_dict_list.append(doctor_dict)
    response_json = {}
    response_json['signal']='200'
    response_json['doctor']=doctors_dict_list

    res = json.dumps(response_json, ensure_ascii=False)
    return res

'''根据患者id与医生id获取历史对话记录'''
'''
如果返回的json里面的signal是'200'，说明查询成功
'''
@app.route("/getChatById")
def getChatById():
    # get the query args
    doctor_id = request.args.get("doctor_id")
    patient_id = request.args.get("patient_id")

    # 读取json文件内容,返回字典格式
    try:
        chat_file = open('./database/chat_record/'+str(doctor_id)+'-'+str(patient_id)+'.json', 'r', encoding='utf8')
    #如果没有聊天文件，则重新创建
    except:
        new_chat_json = {
          "doctor_id": doctor_id,
          "patient_id": patient_id,
          "chat_records": []
        }
        chat_file = open('./database/chat_record/' + str(doctor_id) + '-' + str(patient_id) + '.json', 'w+', encoding='utf8')
        json.dump(new_chat_json, chat_file, ensure_ascii=False)
        chat_file.close()
        chat_file = open('./database/chat_record/' + str(doctor_id) + '-' + str(patient_id) + '.json', 'r',
                         encoding='utf8')
    chat_data = json.load(chat_file)
    chat_file.close()
    response_json = {}

    if(chat_data['chat_records']==[]):
        response_json['signal'] = '200'
        response_json['chat_records'] = []
    else:
        response_json['signal'] = '200'
        response_json['chat_records'] = chat_data['chat_records']
    res = json.dumps(response_json, ensure_ascii=False)
    return res

'''根据患者id与医生id更新对话记录'''
@app.route("/addChatById")
def addChatById():
    # get the query args
    doctor_id = request.args.get("doctor_id")
    patient_id = request.args.get("patient_id")
    sender = request.args.get("sender")
    content = request.args.get("content")
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

    # 读取json文件内容,返回字典格式
    try:
        chat_file = open('./database/chat_record/'+str(doctor_id)+'-'+str(patient_id)+'.json', 'r', encoding='utf8')
    #如果没有聊天文件，则重新创建
    except:
        new_chat_json = {
          "doctor_id": doctor_id,
          "patient_id": patient_id,
          "chat_records": []
        }
        chat_file = open('./database/chat_record/' + str(doctor_id) + '-' + str(patient_id) + '.json', 'w+', encoding='utf8')
        json.dump(new_chat_json, chat_file, ensure_ascii=False)
        chat_file.close()
        chat_file = open('./database/chat_record/' + str(doctor_id) + '-' + str(patient_id) + '.json', 'r',
                         encoding='utf8')
    chat_data = json.load(chat_file)
    chat_file.close()
    new_chat_record={}
    if(sender=='doctor'):
        new_chat_record['sender'] = "doctor"
        new_chat_record['receiver'] = "patient"
    if (sender == 'patient'):
        new_chat_record['sender'] = "patient"
        new_chat_record['receiver'] = "doctor"
    new_chat_record['timestamp']=timestamp
    new_chat_record['content']=content
    chat_data['chat_records'].append(new_chat_record)

    chat_file = open('./database/chat_record/' + str(doctor_id) + '-' + str(patient_id) + '.json', 'w+',
                     encoding='utf8')
    json.dump(chat_data, chat_file, ensure_ascii=False)
    chat_file.close()

    response_json = {}
    response_json['signal'] = '200'
    res = json.dumps(response_json, ensure_ascii=False)
    return res

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=80)