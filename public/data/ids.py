import os
import json

def process_directory(directory):
    json_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.json'):
                file_path = os.path.join(root, file)
                json_files.append(file_path)
    
    # Sort the JSON files by release date
    json_files.sort(key=lambda x: get_release_date(x))
    
    previous_directory_name = None
    previous_release_date = None
    starting_id = 0
    json_files.sort(key=lambda x: (get_release_date(x), os.path.basename(os.path.dirname(x))))
    for file in json_files:
        directory_name = os.path.basename(os.path.dirname(file))
        release_date = get_release_date(file)
        
        if directory_name != previous_directory_name:
            print(f'{directory_name}')
            previous_directory_name = directory_name
            previous_release_date = None
        
        if release_date != previous_release_date:
            previous_release_date = release_date
            starting_id += 1
        
        # Add the id field to the JSON file
        file_name = os.path.basename(file)
        file_id = starting_id
        add_id_field(file, file_id)
        
    # Rename the directories to have a consistent naming convention using the starting id
    for directory_name in os.listdir(directory):
        #Read every first json file in the directory
        with open(f'{directory}/{directory_name}/{os.listdir(f"{directory}/{directory_name}")[0]}', 'r', encoding='utf-8') as file:
            data = json.load(file)
            
        #Get the id of the first json file
        starting_id = data.get('id')
        
        #Rename the directory
        os.rename(f'{directory}/{directory_name}', f'{directory}/{starting_id}')

def add_id_field(file_path, file_id):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    # Add the id field to the JSON data
    data['id'] = file_id
    
    # Move the id field to the top of the JSON data
    data = {'id': file_id, **data}
    
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

def get_release_date(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    # Get the release date from the JSON data
    release_date = data.get('release')
    
    return release_date

# Replace 'directory_path' with the path to your directory
directory_path = '/Users/valodes/Developpement/genshin-api/public/data/characters'
process_directory(directory_path)
