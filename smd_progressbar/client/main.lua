local UseMythic = true -- If true it uses Mythic_notify, if false it uses default ESX notification


local isDoingAction = false

local Action = {
    name = "", 
    time = 0, 
    label = ""
}

function SMD_Progressbar(action)
    local ped = PlayerPedId()
    Action = action
    if not IsEntityDead(ped) then
        if not isDoingAction then
            isDoingAction = true

            SendNUIMessage({
                action = "start",
                time = Action.time,
                label = Action.label,
                icon = Action.icon
            })

            Citizen.CreateThread(function()
                while isDoingAction do
                    Citizen.Wait(1)
                    if tick ~= nil then
                        tick()
                    end
                end
            end)
        else
            notification("Progressbar is already showing something")
        end
    else
        notification("You are dead")
    end
end

RegisterNUICallback('FinishAction', function(data, cb)
    isDoingAction = false
end)

function notification(text)
	if not CurrentlyText then
		CurrentlyText = true
		if UseMythic then
			exports['mythic_notify']:SendAlert('inform', text)
		else
            SetNotificationTextEntry('STRING')
            AddTextComponentString(text)
            DrawNotification(0,1)
		end
		Citizen.Wait(1000)
		CurrentlyText = false
	end
end