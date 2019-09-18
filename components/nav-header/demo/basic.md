---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

````jsx
import { NavHeader } from 'mmode-ui';

const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);
const icon = <img src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' />; 
const icon2 = <img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567746433920&di=cf036c67bcab9d19953164c0a142d6c1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201410%2F09%2F20141009131803_efvuB.jpeg'/>;

const extraBtns = [
  { 
    text: '哈哈',
    icon: icon2,
    menu: {
      mode: 'popup',
      items: [
        { icon, label: '开心' },
        { icon, label: '难过' },
        { icon, label: '郁闷' },
        { icon, label: '踌躇' }
      ],
      onSelect: i => console.log(`第${i + 1}个`)
    }
  }
];

const extraBtns2 = [
  { 
    text: '哈哈',
    icon: icon2,
    menu: {
      mode: 'popup',
      horizontal: true,
      items: [
        { icon, label: '开心' },
        { icon, label: '难过' },
        { icon, label: '悲伤' },
        { icon, label: '愉悦' },
        { icon, label: '欢快' },
        { icon, label: '抑郁' },
        { icon, label: '轻快' },
        { icon, label: '踌躇' },
        { icon, label: '惆怅' },
        { icon, label: '凄凉' },
      ],
      onSelect: (row, col) => console.log(`第${row + 1}行，第${col + 1}个`)
    }
  }
];

const extraBtns3 = [
  { 
    text: '哈哈',
    icon,
    menu: {
      mode: 'popover',
      items: [
        { icon, label: '开心', onClick: () => alert('开心') },
        { icon, label: '难过' }
      ],
      onSelect: i => console.log(`第${i + 1}个`)
    }
  }
];

const extraBtns4 = [
  { 
    text: '开心',
    onClick: a => console.log('开心')
  },
  {
    text: '难过',
    onClick: a => console.log('难过')
  }
];

const NavHeaderExample = () => (
  <div style={{ padding: '15px 0' }}>
    <NavHeader 
      title='底部弹出 - 纵向' 
      subTitle='副标题' 
      onClick={()=>alert(1)}  
      extraBtns={extraBtns} 
    />
  </div>
);

const NavHeaderExample2 = () => (
  <div style={{ padding: '15px 0' }}>
    <NavHeader 
      title='底部弹出 - 横向' 
      subTitle='副标题' 
      onClick={()=>alert(2)}  
      extraBtns={extraBtns2} 
    />
  </div>
);

const NavHeaderExample3 = () => (
  <div style={{ padding: '15px 0' }}>
    <NavHeader 
      title='下拉悬浮' 
      onClick={()=>alert(3)} 
      extraBtns={extraBtns3} 
    />
  </div>
);

const NavHeaderExample4 = () => (
  <div style={{ padding: '15px 0' }}>
    <NavHeader 
      title='按钮组' 
      onClick={()=>alert(4)}  
      extraBtns={extraBtns4} 
    />
  </div>
);

ReactDOM.render(<div>
  <NavHeaderExample />
  <NavHeaderExample2 />
  <NavHeaderExample3 />
  <NavHeaderExample4 />
</div>, mountNode);
````

````css
.placeholder {
  background-color: #ebebef;
  color: #bbb;
  text-align: center;
  height: 30px;
  line-height: 30px;
  width: 100%;
}
````
