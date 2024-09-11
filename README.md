# benchmarking-eng-takehome

Starter Code for Benchmarking Engineer Takehome.

Run the frontend with (ensure you have NPM installed)

```
npm run dev
```

If you're unfamiliar with React, it is best to start with `src/App.tsx`.

## Scripts setup
```
pipenv install  
pipenv shell 
```

## Suite Generation
```
cd scripts
python3 suite_generation.py
```
The suite config file will be generated in JSON & CSV formats.

## Collecting run accuracies
```
cd scripts
python3 getting_run_results.py
```
