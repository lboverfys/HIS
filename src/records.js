export const records = [
  { id: 'VIS-20260929-006', name: '林晓禾', gender: '女', age: 28, department: '全科医学科', diagnosis: '上呼吸道感染', time: '2026-09-29 09:20', doctor: '周明', complaint: '咽部不适伴流涕 2 天。', note: '完成问诊及常规检查，记录本次就诊情况。' },
  { id: 'VIS-20260929-005', name: '陈知远', gender: '男', age: 42, department: '心血管内科', diagnosis: '高血压随访', time: '2026-09-29 08:45', doctor: '王宁', complaint: '常规随访，复查近期血压记录。', note: '核对既往记录，登记本次随访信息。' },
  { id: 'VIS-20260928-004', name: '许安然', gender: '女', age: 35, department: '消化内科', diagnosis: '慢性胃炎', time: '2026-09-28 15:10', doctor: '李晴', complaint: '间断上腹部不适 1 周。', note: '完成病史采集，记录本次检查摘要。' },
  { id: 'VIS-20260928-003', name: '赵以宁', gender: '男', age: 19, department: '骨科', diagnosis: '踝关节扭伤', time: '2026-09-28 11:30', doctor: '吴川', complaint: '运动后右踝疼痛 1 天。', note: '记录受伤经过和局部检查情况。' },
  { id: 'VIS-20260928-002', name: '宋予安', gender: '女', age: 24, department: '皮肤科', diagnosis: '接触性皮炎', time: '2026-09-28 10:05', doctor: '郑月', complaint: '双手皮肤瘙痒伴红斑 3 天。', note: '记录接触史和皮肤检查情况。' },
  { id: 'VIS-20260927-001', name: '陆星辰', gender: '男', age: 31, department: '眼科', diagnosis: '干眼症', time: '2026-09-27 14:40', doctor: '何清', complaint: '双眼干涩，长时间用眼后明显。', note: '登记本次眼部检查摘要。' },
];

export function recordHash(id) {
  return `#/records/${id}`;
}

export function findRecordByHash(hash) {
  const match = hash.match(/^#\/records\/([A-Z0-9-]+)$/);
  return match ? records.find((record) => record.id === match[1]) : undefined;
}
