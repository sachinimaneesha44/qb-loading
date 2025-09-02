-- QBCore Loading Screen - Server Side
-- Handles real-time player count updates for loading screen

local QBCore = exports['qb-core']:GetCoreObject()

-- Configuration
local Config = {
    updateInterval = 2000, -- Update every 2 seconds
    maxPlayers = GetConvarInt('sv_maxclients', 64)
}

-- Function to get current player count
local function GetCurrentPlayerCount()
    return GetNumPlayerIndices()
end

-- Function to send player data to a specific client
local function SendPlayerDataToClient(source)
    local currentPlayers = GetCurrentPlayerCount()
    local maxPlayers = Config.maxPlayers
    
    TriggerClientEvent('qb-loading:updatePlayerCount', source, {
        currentPlayers = currentPlayers,
        maxPlayers = maxPlayers
    })
end

-- Function to broadcast player data to all clients in loading screen
local function BroadcastPlayerData()
    local currentPlayers = GetCurrentPlayerCount()
    local maxPlayers = Config.maxPlayers
    
    -- Send to all players (including those in loading screen)
    TriggerClientEvent('qb-loading:updatePlayerCount', -1, {
        currentPlayers = currentPlayers,
        maxPlayers = maxPlayers
    })
end

-- Event handler for when a player requests loading screen data
RegisterNetEvent('qb-loading:requestPlayerData', function()
    local source = source
    SendPlayerDataToClient(source)
end)

-- Player connecting event
AddEventHandler('playerConnecting', function()
    -- Small delay to ensure player count is updated
    SetTimeout(500, function()
        BroadcastPlayerData()
    end)
end)

-- Player dropped event
AddEventHandler('playerDropped', function()
    -- Small delay to ensure player count is updated
    SetTimeout(500, function()
        BroadcastPlayerData()
    end)
end)

-- Periodic update timer
CreateThread(function()
    while true do
        BroadcastPlayerData()
        Wait(Config.updateInterval)
    end
end)

-- Server startup
AddEventHandler('onResourceStart', function(resourceName)
    if GetCurrentResourceName() == resourceName then
        print('^2[qb-loading]^7 Server-side player count system started')
        print('^2[qb-loading]^7 Max players: ' .. Config.maxPlayers)
        
        -- Initial broadcast after a short delay
        SetTimeout(1000, function()
            BroadcastPlayerData()
        end)
    end
end)

-- Export function for other resources to get player count
exports('GetPlayerCount', function()
    return {
        current = GetCurrentPlayerCount(),
        max = Config.maxPlayers
    }
end)

-- Command for testing (admin only)
QBCore.Commands.Add('playercount', 'Check current player count (Admin Only)', {}, false, function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player.PlayerData.group == 'admin' then
        local current = GetCurrentPlayerCount()
        local max = Config.maxPlayers
        TriggerClientEvent('chat:addMessage', source, {
            color = {0, 255, 0},
            multiline = true,
            args = {'Server', 'Current players: ' .. current .. '/' .. max}
        })
    end
end, 'admin')