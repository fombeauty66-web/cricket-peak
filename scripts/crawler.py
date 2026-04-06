import json
import time
import random
import os

# 确保路径指向根目录下的 public 文件夹
DATA_PATH = os.path.join(os.path.dirname(__file__), "../public/live_data.json")

# --- 全局状态变量（让比分持续累加） ---
state = {
    "runs": 180,    # 初始分数
    "wickets": 2,   # 初始出局数
    "overs_main": 15, # 初始局数
    "overs_ball": 1   # 初始球数
}

def fetch_real_match_data():
    global state
    
    # 1. 模拟局数增加 (每 5 秒投一球)
    state["overs_ball"] += 1
    if state["overs_ball"] > 6:
        state["overs_ball"] = 1
        state["overs_main"] += 1
    
    # 2. 模拟分数增加 (每球随机增加 0, 1, 2, 4, 6 分)
    run_options = [0, 1, 1, 2, 4, 6]
    state["runs"] += random.choice(run_options)
    
    # 3. 模拟出局 (极低概率增加一个 Wicket，最多 10 个)
    if random.random() < 0.05 and state["wickets"] < 10:
        state["wickets"] += 1

    # 4. 模拟动态文案
    need_runs = max(0, 240 - state["runs"])
    remain_balls = max(0, 120 - (state["overs_main"] * 6 + state["overs_ball"]))

    return {
        "live": [
            {
                "title": "IPL 2026: MI VS CSK",
                # 格式：CSK 185/3 (15.4)
                "score": f"CSK {state['runs']}/{state['wickets']} ({state['overs_main']}.{state['overs_ball']})",
                "status": f"CSK NEED {need_runs} RUNS IN {remain_balls} BALLS"
            }
        ],
        "standings": [
            {"team": "RR", "p": "12", "pts": "18"},
            {"team": "KKR", "p": "11", "pts": "16"},
            {"team": "SRH", "p": "12", "pts": "14"},
            {"team": "CSK", "p": "12", "pts": "12"}
        ],
        "redirect_url": "https://cricketpeak.com/match-prediction-pro"
    }

def main():
    print("------------------------------------------")
    print("🚀 CricketPeak Data Engine V1.2.2 (Logic Fixed)")
    print(f"📁 Target: {os.path.abspath(DATA_PATH)}")
    print("📈 Status: Sequential Scoring Active")
    print("------------------------------------------")
    
    while True:
        try:
            data = fetch_real_match_data()
            
            # 确保目录存在
            os.makedirs(os.path.dirname(DATA_PATH), exist_ok=True)
            
            with open(DATA_PATH, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            # 打印日志，验证比分是否在递增
            print(f"✅ [{time.strftime('%H:%M:%S')}] Score: {data['live'][0]['score']} | Run Log: +{data['live'][0]['score'].split()[1]}")
            
            # 保持 5 秒同步一次
            time.sleep(5)
            
        except KeyboardInterrupt:
            print("\n🛑 Crawler stopped by user.")
            break
        except Exception as e:
            print(f"❌ [{time.strftime('%H:%M:%S')}] Error: {e}")
            time.sleep(10)

if __name__ == "__main__":
    main()