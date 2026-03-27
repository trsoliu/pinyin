# 拼音学习工具 - Supabase 数据库集成

## 项目概述

这是一个面向 6-12 岁学龄儿童的拼音学习工具网站，提供拼音教学、练习、测试和家长监控功能。

## 技术栈

- **前端框架**: React 18
- **路由**: React Router DOM (HashRouter)
- **UI 组件**: Radix-ui Icons
- **图标**: Lucide React
- **样式**: Tailwind CSS
- **数据库**: Supabase (PostgreSQL)

## Supabase 数据库配置

### 数据库表结构

项目包含以下数据表（所有表名都带有 `_69564` 后缀）：

1. **users_69564** - 用户信息表
   - `id`: UUID 主键
   - `email`: 邮箱（唯一）
   - `name`: 姓名
   - `role`: 角色（'child' 或 'parent'）
   - `age`: 年龄
   - `avatar_url`: 头像 URL
   - `created_at`: 创建时间
   - `updated_at`: 更新时间

2. **learning_records_69564** - 学习记录表
   - `id`: UUID 主键
   - `user_id`: 用户 ID（外键）
   - `pinyin_type`: 拼音类型（'consonant' 或 'vowel'）
   - `pinyin_char`: 拼音字符
   - `status`: 状态（'locked', 'learning', 'completed'）
   - `learned_at`: 学会时间
   - `practice_count`: 练习次数
   - `created_at`: 创建时间
   - `updated_at`: 更新时间

3. **test_scores_69564** - 测试成绩表
   - `id`: UUID 主键
   - `user_id`: 用户 ID（外键）
   - `test_type`: 测试类型（'consonant', 'vowel', 'comprehensive'）
   - `score`: 分数
   - `total_questions`: 总题数
   - `correct_answers`: 正确题数
   - `duration_seconds`: 用时（秒）
   - `test_date`: 测试日期
   - `created_at`: 创建时间

4. **parent_child_binding_69564** - 家长儿童绑定表
   - `id`: UUID 主键
   - `parent_id`: 家长 ID（外键）
   - `child_id`: 儿童 ID（外键）
   - `binding_code`: 绑定码
   - `status`: 状态（'active', 'inactive'）
   - `created_at`: 创建时间
   - `updated_at`: 更新时间

### 数据库连接配置

配置文件位于 `/src/lib/supabase.js`：

```javascript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://www.weavefox.cn/api/open/v1/supabase_proxy/2890';
const SUPABASE_ANON_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcxOTk5NDA3LCJleHAiOjEzMjgyNjM5NDA3fQ.PpDJ1BV-AVp9oq83ea6Yw1AhYLMRivM2moP9b8w_leo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

## 自定义 Hooks

### useLearningRecords

用于管理学习记录的 Hook。

```javascript
import { useLearningRecords } from './hooks/useLearningRecords';

const { records, loading, error, updateRecord, getProgress, refetch } = useLearningRecords(userId);
```

**返回属性：**
- `records`: 学习记录数组
- `loading`: 加载状态
- `error`: 错误信息
- `updateRecord(pinyinType, pinyinChar, status)`: 更新学习记录
- `getProgress()`: 获取学习进度
- `refetch()`: 重新加载数据

### useTestScores

用于管理测试成绩的 Hook。

```javascript
import { useTestScores } from './hooks/useTestScores';

const { scores, loading, error, saveScore, getAverageScore, getRecentTests, refetch } = useTestScores(userId);
```

**返回属性：**
- `scores`: 测试成绩数组
- `loading`: 加载状态
- `error`: 错误信息
- `saveScore(testData)`: 保存测试成绩
- `getAverageScore()`: 获取平均分
- `getRecentTests(limit)`: 获取最近测试
- `refetch()`: 重新加载数据

## 数据初始化

项目提供了测试数据初始化工具，位于 `/src/lib/init-data.js`：

```javascript
import { initAllTestData, TEST_USER_ID } from './lib/init-data';

// 在开发环境中运行初始化
await initAllTestData();
```

**注意：** 初始化函数应该在浏览器控制台或开发工具中手动调用，不要在应用启动时自动执行。

## 项目结构

```
/
├── package.json                          # 项目依赖
├── README.md                             # 项目说明
├── supabase/
│   └── migrations/
│       ├── create_users_69564.sql        # 用户表迁移
│       ├── create_learning_records_69564.sql   # 学习记录表迁移
│       ├── create_test_scores_69564.sql       # 测试成绩表迁移
│       └── create_parent_child_binding_69564.sql  # 绑定关系表迁移
├── src/
│   ├── index.jsx                         # 应用入口
│   ├── App.jsx                           # 主应用组件
│   ├── lib/
│   │   ├── supabase.js                   # Supabase 客户端配置
│   │   └── init-data.js                  # 测试数据初始化
│   ├── hooks/
│   │   ├── useLearningRecords.js         # 学习记录 Hook
│   │   └── useTestScores.js              # 测试成绩 Hook
│   ├── components/
│   │   ├── Header.jsx                    # 头部组件
│   │   └── Footer.jsx                    # 底部组件
│   └── pages/
│       ├── Home.jsx                      # 首页
│       ├── Learning.jsx                  # 学习页面（已集成 Supabase）
│       ├── Practice.jsx                  # 练习页面
│       ├── Test.jsx                      # 测试页面
│       ├── Report.jsx                    # 学习报告
│       └── ParentDashboard.jsx           # 家长监控（已集成 Supabase）
└── docs/
    ├── prd.md                            # 产品需求文档
    └── design.md                         # 视觉设计文档
```

## 使用说明

### 1. 安装依赖

```bash
npm install
```

### 2. 应用数据库迁移

在 Supabase 项目中执行 `supabase/migrations/` 目录下的 SQL 迁移文件，按以下顺序执行：

1. `create_users_69564.sql`
2. `create_learning_records_69564.sql`
3. `create_test_scores_69564.sql`
4. `create_parent_child_binding_69564.sql`

### 3. 初始化测试数据（可选）

在浏览器控制台运行：

```javascript
import { initAllTestData } from './lib/init-data';
await initAllTestData();
```

### 4. 启动应用

```bash
npm start
```

## 功能模块

### 已集成 Supabase 的功能

1. **拼音学习 (Learning.jsx)**
   - 学习进度云端同步
   - 声母/韵母学习状态保存
   - 实时更新学习记录

2. **家长监控 (ParentDashboard.jsx)**
   - 从数据库读取学习统计
   - 测试成绩展示
   - 学习进度可视化

### 待集成的功能

以下页面目前仍使用模拟数据，后续迭代中将集成 Supabase：

- Practice.jsx - 练习页面
- Test.jsx - 测试页面（需要保存测试成绩）
- Report.jsx - 学习报告页面

## 注意事项

1. **用户认证**: 为了简化演示，当前使用固定的测试用户 ID。实际应用中需要实现完整的用户注册/登录系统。

2. **数据安全**: 生产环境中需要配置 Supabase RLS (Row Level Security) 策略，确保用户只能访问自己的数据。

3. **错误处理**: 所有数据库操作都包含了错误处理和用户友好的错误提示。

4. **性能优化**: 使用了 React Hooks 的 `useCallback` 和 `useEffect` 来优化性能，避免不必要的重新渲染。

## 下一步计划

1. 实现用户注册/登录功能
2. 完善家长 - 儿童绑定机制
3. 集成 Practice.jsx 和 Test.jsx 使用 Supabase
4. 添加学习提醒和通知功能
5. 实现学习数据导出功能
6. 优化移动端体验

## 技术支持

如有问题，请参考：
- [Supabase 官方文档](https://supabase.com/docs)
- [React 官方文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)