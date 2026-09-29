import { records, findRecord } from './records.js';

const app = document.querySelector('#app');
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>';
const fileIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>';

function renderList() {
  document.title = '就诊记录 · HIS';
  app.innerHTML = `
    <div class="breadcrumb">工作台 <span>/</span> 就诊记录</div>
    <section class="page-intro">
      <div><p class="eyebrow">VISIT RECORDS</p><h1 tabindex="-1">就诊记录</h1><p class="subtitle">每一次就诊，都有清晰的记录。</p></div>
      <div class="record-total"><span class="total-icon">${fileIcon}</span><div><strong>${String(records.length).padStart(2, '0')}</strong><span>条就诊记录</span></div></div>
    </section>
    <section class="panel records-panel" aria-labelledby="list-title">
      <div class="panel-heading"><h2 id="list-title">全部就诊 <span class="count">${records.length}</span></h2><p>按就诊时间由近到远排列</p></div>
      <div class="table-wrap"><table>
        <caption class="sr-only">就诊记录列表，包含患者姓名、科室、诊断和时间</caption>
        <thead><tr><th scope="col">患者姓名</th><th scope="col">就诊科室</th><th scope="col">诊断</th><th scope="col">就诊时间</th><th scope="col"><span class="sr-only">操作</span></th></tr></thead>
        <tbody>${records.map((record, index) => `
          <tr>
            <td><div class="patient-cell"><span class="avatar tone-${index % 3}" aria-hidden="true">${record.name.slice(-2)}</span><div><strong>${record.name}</strong><span>${record.gender} · ${record.age} 岁</span></div></div></td>
            <td data-label="科室"><span class="department">${record.department}</span></td>
            <td class="diagnosis" data-label="诊断">${record.diagnosis}</td>
            <td class="visit-time" data-label="就诊时间">${record.time}</td>
            <td class="action-cell"><a class="detail-link" href="#/records/${record.id}" aria-label="查看${record.name}的就诊详情">查看详情 ${arrow}</a></td>
          </tr>`).join('')}</tbody>
      </table></div>
      <div class="panel-footer"><span><i class="status-dot"></i> 共 ${records.length} 条，已显示全部记录</span><span>教学模拟数据</span></div>
    </section>`;
}

function renderDetail(record) {
  document.title = `${record.name}的就诊详情 · HIS`;
  app.innerHTML = `
    <div class="breadcrumb"><a href="#/records">就诊记录</a><span>/</span>就诊详情</div>
    <section class="page-intro detail-intro"><div><p class="eyebrow">VISIT DETAIL</p><h1 tabindex="-1">就诊详情</h1><p class="subtitle">查看本次就诊的完整信息。</p></div><a class="back-link" href="#/records"><span aria-hidden="true">←</span> 返回列表</a></section>
    <section class="panel patient-banner" aria-label="患者基本信息"><div class="patient-cell"><span class="avatar avatar-large tone-0" aria-hidden="true">${record.name.slice(-2)}</span><div><h2>${record.name}</h2><span>${record.gender} · ${record.age} 岁</span></div></div><div class="record-id"><span>就诊编号</span><strong>${record.id}</strong></div></section>
    <div class="detail-grid">
      <section class="panel information" aria-labelledby="info-title"><div class="panel-heading"><h2 id="info-title">本次就诊</h2>${fileIcon}</div><dl class="info-grid"><div><dt>就诊科室</dt><dd>${record.department}</dd></div><div><dt>接诊医生</dt><dd>${record.doctor}</dd></div><div class="wide"><dt>就诊时间</dt><dd>${record.time}</dd></div></dl><div class="diagnosis-block"><span>诊断记录</span><strong>${record.diagnosis}</strong></div></section>
      <section class="panel clinical-notes" aria-labelledby="notes-title"><div class="panel-heading"><h2 id="notes-title">就诊摘要</h2><span class="note-label">本次记录</span></div><div class="notes-body"><section><h3>主诉</h3><p>${record.complaint}</p></section><section><h3>记录摘要</h3><p>${record.note}</p></section><p class="data-notice">以上内容为虚构教学资料，不作为诊疗依据。</p></div></section>
    </div>`;
}

function renderNotFound() {
  document.title = '记录不存在 · HIS';
  app.innerHTML = `<section class="panel empty-state"><span class="empty-icon">${fileIcon}</span><p class="eyebrow">RECORD NOT FOUND</p><h1 tabindex="-1">未找到该就诊记录</h1><p>该地址没有对应记录，请返回列表重新选择。</p><a class="back-link" href="#/records">返回就诊记录</a></section>`;
}

function render() {
  const hash = window.location.hash;
  if (!hash || hash === '#/records') {
    renderList();
  } else {
    const match = hash.match(/^#\/records\/([A-Z0-9-]+)$/);
    const record = match && findRecord(match[1]);
    if (record) renderDetail(record);
    else renderNotFound();
  }
}

window.addEventListener('hashchange', () => {
  render();
  app.querySelector('h1').focus();
  window.scrollTo(0, 0);
});
render();
