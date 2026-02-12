from flask import Flask,jsonify,request
from fieldData import field_data
# import psycopg2
from sqlalchemy import create_engine,text
from flask_cors import CORS

engine = create_engine("postgresql+psycopg2://postgres:admin123@host.docker.internal/opsradar", echo=True)

# conn = psycopg2.connect(
#     dbname="opsradar",
#     user="postgres",
#     password="admin123",
#     host="localhost"
# )

app = Flask(__name__)
CORS(app,origins=["http://localhost:3000"])

@app.route("/metadata")
def getFieldData():
    return field_data

@app.route("/incidents")
def getIncidentData():
    with engine.connect() as connector:
        result = connector.execute(text("SELECT * FROM incidents"))
        rows = result.fetchall()
        data = [dict(row._mapping) for row in rows]
    # cur = conn.cursor()
    # cur.execute("SELECT * FROM incidents")
    # incidents = cur.fetchall()
        return data

@app.route("/incident/<int:incident_id>")
def getIncidentDetails(incident_id):
    with engine.connect() as conn:
        result = conn.execute(text(f"SELECT * FROM incidents WHERE id = {incident_id}"))
        rows = result.fetchall()
        incident = [dict(row._mapping) for row in rows]
        print(incident[0])
        return incident[0]

@app.route("/incident/<int:incident_id>",methods=["PUT"])
def editIncidentDetails(incident_id):
    updatedData = request.json
    statusValue = updatedData.get("status")
    assigneeValue = updatedData.get("assignee")
    severityValue = updatedData.get("severity")
    tagsValue = updatedData.get("tags")
    with engine.connect() as conn:
        result = conn.execute(text(f"UPDATE incidents SET status = '{statusValue}', assignee = '{assigneeValue}', tags = '{tagsValue}', severity = '{severityValue}', updated_at = NOW() WHERE id = {incident_id}"))
        conn.commit()

    return "<p>Incident updated</p>"

@app.route("/create-incident", methods=["POST"])
def createIncident():
    data = request.json
    title = data.get("title")
    description = data.get("description")
    creator = data.get("cretor")
    assignee = data.get("assignee")
    status = data.get("status")
    severity = data.get("severity")
    service = data.get("service")
    category = data.get("category")
    tags = data.get("tags")
    with engine.connect() as conn:
        conn.execute(
            text(f"INSERT INTO incidents (title,description,assignee,creator,status,service,category,tags,severity) VALUES ('{title}', '{description}', '{assignee}', '{creator}', '{status}', '{service}', '{category}', '{tags}', '{severity}')"),
        )
        conn.commit()

    return "<p>Incident Details</p>"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)