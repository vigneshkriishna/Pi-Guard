# Pi-Guard Application Launcher
# This script starts both the server and client in separate PowerShell windows

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "    Pi-Guard Application Launcher" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$serverPath = Join-Path $scriptPath "Server"
$clientPath = Join-Path $scriptPath "Client"

# Check if Server folder exists
if (-not (Test-Path $serverPath)) {
    Write-Host "ERROR: Server folder not found at $serverPath" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if Client folder exists
if (-not (Test-Path $clientPath)) {
    Write-Host "ERROR: Client folder not found at $clientPath" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if Server .env exists
if (-not (Test-Path "$serverPath\.env")) {
    Write-Host "WARNING: Server .env file not found!" -ForegroundColor Yellow
    Write-Host "Please create Server\.env file with your API keys" -ForegroundColor Yellow
    Write-Host "See Server\.env.example for reference" -ForegroundColor Yellow
    Write-Host ""
}

# Check if Client .env exists
if (-not (Test-Path "$clientPath\.env")) {
    Write-Host "WARNING: Client .env file not found!" -ForegroundColor Yellow
    Write-Host "Please create Client\.env file with your Supabase credentials" -ForegroundColor Yellow
    Write-Host "See Client\.env.example for reference" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Starting Pi-Guard..." -ForegroundColor Green
Write-Host ""

# Start Server in a new PowerShell window
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$serverPath'; Write-Host 'Pi-Guard Backend Server' -ForegroundColor Cyan; Write-Host ''; npm start"

# Wait a moment for server to start
Start-Sleep -Seconds 2

# Start Client in a new PowerShell window
Write-Host "Starting Frontend Client..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$clientPath'; Write-Host 'Pi-Guard Frontend Client' -ForegroundColor Cyan; Write-Host ''; npm run dev"

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "    Pi-Guard is starting up!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend Server: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend Client: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Two PowerShell windows have been opened:" -ForegroundColor White
Write-Host "  1. Backend Server (running on port 5000)" -ForegroundColor White
Write-Host "  2. Frontend Client (running on port 5173)" -ForegroundColor White
Write-Host ""
Write-Host "Wait a few seconds for servers to start," -ForegroundColor Yellow
Write-Host "then open http://localhost:5173 in your browser!" -ForegroundColor Yellow
Write-Host ""
Write-Host "To stop the servers, close the PowerShell windows" -ForegroundColor Gray
Write-Host "or press Ctrl+C in each window." -ForegroundColor Gray
Write-Host ""

Read-Host "Press Enter to close this window"
