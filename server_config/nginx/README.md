# Commands

## Requirements

- Copy and Paste file *bolao.conf* to */etc/nginx/sites-available/*

## Run command

To activate bolao configuration

```
sudo ln -s /etc/nginx/sites-available/bolao.conf /etc/nginx/sites-enabled/
```

Delete the default config file

```
sudo rm /etc/nginx/sites-enabled/default
```

After restart the nginx

```
sudo systemctl restart nginx
```