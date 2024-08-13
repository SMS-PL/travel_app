
const AchievementView = ({achievement}) => {

    return (
        <div className="flex flex-col justify-center items-center cursor-pointer">
            <div className="flex flex-col justify-center items-center w-[80px] h-[80px]">
                {(achievement.level != null) && achievement.level === 0 && (
                    // <Icons.medal2Fill className="h-9 w-9 fill-yellow-900" />
                    <img src="/medals/bronze_medal.png" alt="" className="w-[80px] h-[80px]" />
                )}
                {(achievement.level != null) && achievement.level === 1 && (
                    <img src="/medals/silver_medal.png" alt="" className="w-[80px] h-[80px]" />
                )}

                {(achievement.level != null) && achievement.level === 2 && (
                    <img src="/medals/gold_medal.png" alt="" className="w-[80px] h-[80px]" />
                )}

                {(achievement.level != null) && achievement.level === 3 && (
                    <img src="/medals/elite_medal.png" alt="" className="w-[80px] h-[80px]" />
                )}
            </div>

            <div className="font-bold text-xs text-center">
                {achievement.title}
            </div>
        </div>
    );
};

export default AchievementView;
