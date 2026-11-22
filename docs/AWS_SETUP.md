# Setting up the server on AWS

Follow these in order. Steps marked 📸 are good screenshots for the "proof of your own web server" requirement.

Region for everything: **Asia Pacific (Singapore) `ap-southeast-1`**. Pick it in the top-right of the AWS Console before you start.

---

## 1. Billing safety net (5 min)

1. Console search bar → **Billing and Cost Management** → **Budgets** → **Create budget**.
2. Choose **Use a template** → **Zero spend budget**. Enter your email → **Create budget**.
3. Do **not** click "Upgrade plan" anywhere. On the Free plan AWS cannot charge your card; the credits pay for the server.

> One public IPv4 address costs about $0.005/hour (~$3.60/month). That comes out of your Free plan credits, not your card.

## 2. Database: Supabase (10 min)

1. Go to <https://supabase.com> → sign in with GitHub → **New project**. Region: **Southeast Asia (Singapore)**. Save the database password somewhere safe.
2. **SQL Editor** → **New query** → paste all of [`db/schema.sql`](../db/schema.sql) → **Run**.
3. **Project Settings → API** (or **API Keys**). Copy:
   - Project URL → `SUPABASE_URL`
   - the **secret** key (`sb_secret_…`, or the legacy `service_role` key) → `SUPABASE_SECRET_KEY`

   Never paste the secret key into frontend code or commit it to GitHub.

> Free Supabase projects pause after 7 days with no activity. Open the site the day before grading.

## 3. Launch the EC2 server (10 min)

1. Console → **EC2** → **Launch instance**.
2. Name: `Elective Server`.
3. Image: **Ubuntu Server 24.04 LTS** (marked *Free tier eligible*).
4. Instance type: **t3.micro** (marked *Free tier eligible*).
5. Key pair → **Create new key pair** → name `Elective-key`, type RSA, format `.pem` → it downloads. Keep this file safe; you need it to log in and for GitHub.
6. Network settings → **Edit**:
   - Allow **SSH (22)** from **Anywhere** (needed so GitHub Actions can deploy; logins still require your key file).
   - Allow **HTTP (80)** from **Anywhere**.
   - Allow **HTTPS (443)** from **Anywhere** (for DuckDNS later).
7. Storage: 8–20 GB gp3 is fine. → **Launch instance**.
8. 📸 **Instances** list showing `Elective Server` *Running*.

## 4. Give it a fixed address: Elastic IP (2 min)

1. EC2 → **Elastic IPs** → **Allocate Elastic IP address** → **Allocate**.
2. Select it → **Actions → Associate Elastic IP address** → choose `Elective Server` → **Associate**.
3. Open the instance → copy **Public IPv4 DNS**, e.g. `ec2-13-229-1-2.ap-southeast-1.compute.amazonaws.com`. **This is your site's address.**
4. 📸 The instance details page showing the Elastic IP and Public DNS.

## 5. Install Node, pm2 and Caddy on the server (10 min)

Connect: EC2 → select instance → **Connect** → **EC2 Instance Connect** → **Connect** (opens a terminal in the browser). Then paste:

```bash
# 1 GB swap so the small server doesn't run out of memory
sudo fallocate -l 1G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Node.js 24 + pm2
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

# Caddy (web server in front of Node)
sudo apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt-get update && sudo apt-get install -y caddy

# Send port 80 to the Node app
printf ':80 {\n\treverse_proxy localhost:3000\n}\n' | sudo tee /etc/caddy/Caddyfile
sudo systemctl reload caddy

# Start pm2 on boot
pm2 startup systemd -u ubuntu --hp /home/ubuntu | tail -n 1 | sudo bash

# App folder + secrets file
mkdir -p ~/ElectiveFinals && nano ~/ElectiveFinals/.env
```

In `nano`, paste the contents of [`.env.example`](../.env.example) with your real values (generate `JWT_SECRET` as the comment shows). Save with `Ctrl+O`, `Enter`, exit with `Ctrl+X`.

## 6. Connect GitHub so pushes deploy automatically (10 min)

1. Create a GitHub repo (private is fine) and push this project to `main`.
2. Repo → **Settings → Secrets and variables → Actions → New repository secret**, add three:
   | Name | Value |
   |---|---|
   | `EC2_HOST` | the Public IPv4 DNS from step 4 |
   | `EC2_USER` | `ubuntu` |
   | `EC2_SSH_KEY` | the entire contents of `Elective-key.pem` (open it in Notepad, copy all) |
3. **Actions** tab → **Deploy to EC2** → **Run workflow** (or just push). It should go green in ~1–2 minutes.

## 7. Create the first admin and open the site

In the EC2 Instance Connect terminal:

```bash
cd ~/ElectiveFinals && npm run create-admin -- admin YourStrongPassword
```

Open `http://<your Public IPv4 DNS>` in a browser and log in. 📸 The site open in the browser with the address bar visible.

---

## Later (optional): short name + HTTPS with DuckDNS

1. <https://www.duckdns.org> → sign in with GitHub → add a subdomain → set its IP to your **Elastic IP** → **update ip**.
2. On the server: `sudo nano /etc/caddy/Caddyfile`, replace the contents with the DuckDNS block from [`deploy/Caddyfile`](../deploy/Caddyfile), then `sudo systemctl reload caddy`.
3. In `~/ElectiveFinals/.env` set `COOKIE_SECURE=true`, then `pm2 reload ElectiveFinals`.
4. Update the `EC2_HOST` secret if you like (the old DNS name keeps working).

## After grading: stop the meter

EC2 → select instance → **Instance state → Terminate**, then **Elastic IPs → Release**. Otherwise they keep using credits.
