import csv
import json
import os

suite_config = {
  "title": "Test title",
  "description": "Test description",
  "tests": []
}
tests = suite_config["tests"]

def create_test(csv_row):
  test = {"input_under_test": row[2], "checks": [
    {"operator": "equal_intent", 
      "criteria": row[3]
    }
  ]}
  return test

with open('../data/medical_qa.csv', newline='') as csvfile: 
  reader = csv.reader(csvfile)
  header = next(reader)

  for row in reader:
    # Maybe some complicated test
    test = create_test(row)
    tests.append(test)

# Writing json & csv configs  
config_dir = "suite_configs"
if not os.path.exists(config_dir):
    os.makedirs(config_dir)

with open(f'{config_dir}/medical_suite.json', 'w') as json_output_file:
  json.dump(suite_config, json_output_file, indent = 2)

with open(f'{config_dir}/medical_suite.csv', 'w') as csv_output_file:
  rows = [["Test Input","Operator","Criteria","Severity"]]
  for test in tests:
    subrows = []
    for check in test["checks"]:
      SEVERITY = 1
      subrows.append([None, check['operator'], check['criteria'], SEVERITY])
    subrows[0][0] = test['input_under_test']
    rows += subrows

  writer = csv.writer(csv_output_file)
  writer.writerows(rows)



