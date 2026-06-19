import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fixedItems = [
  "相同 Muse 产品页面题材",
  "相同 GPT-5.5 模型标识",
  "相同本地 mock 数据",
  "独立结果页路由",
  "不使用 iframe 嵌套",
  "支持静态导出",
]

const pageRequirements = [
  {
    title: "Muse 工作台",
    body: "每个结果页都展示 AI 活动工作台页面，包括 brief 控件、主创意预览、版本选择、预测指标、操作记录和按钮状态。",
  },
  {
    title: "使用链路上下文",
    body: "每个展示项都会保留对应 skill chain，方便把页面效果和使用链路对应起来。",
  },
  {
    title: "独立打开",
    body: "每个结果都在新标签打开独立路由，首页只作为展示入口，不嵌套产品页。",
  },
  {
    title: "技能资料",
    body: "技能页记录官方链接、GitHub、本地路径、安装命令、使用命令和关联组合。",
  },
]

export default function Page() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">展示说明</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          这个项目只展示不同 frontend design skill chain 的页面效果，不做评分和结论。
        </p>
      </div>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>固定设置</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm text-muted-foreground">
          <p>
          所有展示项使用同一个 Muse 页面题材和 GPT-5.5 模型标识，可见变量是使用链路。
          </p>
          <div className="flex flex-wrap gap-2">
            {fixedItems.map((label) => (
              <Badge key={label} variant="outline">
                {label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 md:grid-cols-2">
        {pageRequirements.map((item) => (
          <Card key={item.title} className="rounded-lg">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">{item.body}</CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
