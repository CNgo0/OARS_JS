const OarsApiEnv = {
    Development: 'DEVELOPMENT',
    Production: 'PRODUCTION'
}

const OarsDbEnv = {
    Development: 'DEVELOPMENT',
    Production: 'PRODUCTION'
}

function OarsConfiguration(project, key)
{
    this.project = project;
    this.key = key;
    this.apiEnv = OarsApiEnv.Development;
    this.dbEnv = OarsDbEnv.Development;

    this.SetEnvironment = function(apiEnv, dbEnv)
    {
        this.apiEnv = apiEnv;
        this.dbEnv = dbEnv;
    }
}

function OarsResult()
{
    this.data = null;
    this.contentType = null;
}

function Oars()
{
    const oarsUrl = 'https://apps-nefsc.fisheries.noaa.gov/oars/';

    this.BuildFormBase = function(config)
    {
        let form = new FormData();
        form.append('PROJECT', config.project);
        form.append('KEY', config.key);
        form.append('API_ENV', config.apiEnv);
        form.append('DB_ENV', config.dbEnv);
        return form;
    }

    this.Download = function(config, filename)
    {
        let result = new OarsResult();
        let form = this.BuildFormBase(config);
        form.append('TYPE', 'file');
        form.append('FILENAME', filename);
        const request = new XMLHttpRequest();
        
        request.addEventListener('load', function(e)
        {
            console.log(e);
        }, false);
        
        request.open("GET", oarsUrl, true);
        request.send();
    }
}