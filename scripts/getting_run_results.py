import subprocess 
import pandas as pd
import statistics
import json
'''
GPT 4: 
c50be525-62c5-4441-945d-9db4a0192c3a
15d8048b-dfde-4109-8c8c-fa90bcbf6a76
f56e6356-e0cc-46f0-8277-5d25b364fd57

Mixtral 4:
be2c0c5a-eafe-4d7f-94c1-491f37baf3e7
d391cde0-2b0f-4e56-9f9d-619c7a48200c
ce425009-65de-4236-92dc-b33ae17078ea

Falcon
'''

def get_model_result(run_ids):
  accuracies = []
  net_result = {}
  for run_id in run_ids:
    csv_path = f'../out/{run_id}.csv'
    command = f'vals run get-csv {run_id} ../out/{run_id}.csv'
    subprocess.run(command, shell=True, capture_output=True, text=True)

    df = pd.read_csv(csv_path)
    accuracies.append(df['Auto Eval'].mean())

  return statistics.mean(accuracies)

if __name__ == '__main__':
  net_result = {}
  print("Geting results...")
  
  gpt_ids = ['c50be525-62c5-4441-945d-9db4a0192c3a', '15d8048b-dfde-4109-8c8c-fa90bcbf6a76', 'f56e6356-e0cc-46f0-8277-5d25b364fd57']
  net_result['gpt4'] = get_model_result(gpt_ids)
  print(f'GPT4 average: {net_result['gpt4']}')

  mixtral_ids = ['be2c0c5a-eafe-4d7f-94c1-491f37baf3e7', 'd391cde0-2b0f-4e56-9f9d-619c7a48200c', 'ce425009-65de-4236-92dc-b33ae17078ea']
  net_result['mixtral'] = get_model_result(mixtral_ids)
  print(f'Mixtral average: {net_result['mixtral']}')

  falcon_ids = ['be2c0c5a-eafe-4d7f-94c1-491f37baf3e7', 'd391cde0-2b0f-4e56-9f9d-619c7a48200c', 'ce425009-65de-4236-92dc-b33ae17078ea']
  net_result['falcon'] = get_model_result(falcon_ids)
  print(f'Falcon average: {net_result['falcon']}')

  with open(f'../out/results.json', 'w') as results_file:
    json.dump(net_result, results_file, indent = 2)

