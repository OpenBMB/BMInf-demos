import psutil
import pynvml

def gpu_info():
    NUM_EXPAND = 1024*1024
    pynvml.nvmlInit()
    handle = pynvml.nvmlDeviceGetHandleByIndex(0)
    info = pynvml.nvmlDeviceGetMemoryInfo(handle)
    mem_used_rate = round(info.used/info.total,4)*100  #显存 
    utilization = pynvml.nvmlDeviceGetUtilizationRates(handle)
    gpu_rate = round(utilization.gpu,4)            #gpu使用率
    memory_rate = round(utilization.memory,4)      #内存使用率

    pynvml.nvmlShutdown()
    #memory_rate = psutil.virtual_memory().percent

    rate={}
    rate['memory_rate']= memory_rate
    rate['gpu_rate']= gpu_rate
    rate['meme_used_rate'] = mem_used_rate
    return rate
