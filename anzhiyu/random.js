var posts=["2025/08/06/3 分钟实现手机_平板_电脑操控 Windows 云电脑（服务器）/","2025/08/06/PayPal与微信，印度UPI，Mercado Pago等巨头合作，打造首个全球钱包联盟/","2025/08/06/hello-world/","2025/08/06/一文教你如何申请免费版的阿里企业邮箱/","2025/08/18/和大家聊聊如果遇到这种情况，你会怎么做呢QWQ/","2025/08/18/最近搞了一个开源的个人主页，欢迎各位来看看AWA/","2025/08/16/教你一键白嫖vercel部署unami监控系统/","2025/08/06/阿里云ESA免费套餐上线啦，快快去薅！/","2025/08/06/马上2026年高考要来了，各位加油鸭！qwq/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"anzhiyu主题","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg"},{"name":"umami监控","link":"https://umami.is/","avatar":"https://cdn.tulan.cyou/noah/2025/08/16/umami7.png","descr":"一个开源的网站分析工具"},{"name":"Wer Blog","link":"https://blog.isyyo.com","avatar":"https://blog.isyyo.com/favicon/logo.png","descr":"The only way to do great is to love what you do","siteshot":"https://cdn.tulan.cyou/noah/2025/08/16/4f6d4e7d-3a0a-465d-affc-8f2f373bac4c.png","atom(options)":"https://blog.liushen.fun/atom.xml","color":"vip","tag":"技术大佬"},{"name":"GoodBoyboy 's Blog","link":"https://blog.goodboyboy.top/","avatar":"https://gravatar.goodboyboy.top/avatar/9da9d1d515d273d4794015f2321f6e04?s=96&d=monsterid&r=g","descr":"惬意小屋-点滴记忆","siteshot":"https://cdn.tulan.cyou/noah/2025/08/16/0d5b6258f403117220455bdeae289391.png","color":"vip","tag":"高级"},{"name":"龙星划空","link":"https://blog.245179.xyz/","descr":"人生近看是悲剧，远看是喜剧","avatar":"https://blog.245179.xyz/images/atiq.png","siteshot":"https://blog.245179.xyz/images/web.png","color":"vip","tag":"好友"},{"name":"梦爱吃鱼","link":"https://blog.bsgun.cn/","avatar":"https://oss-cdn.bsgun.cn/logo/avatar.256.png","descr":"不负心灵，不负今生。","siteshot":"https://cdn.tulan.cyou/noah/2025/08/16/0d5b6258f403117220455bdeae289391.png","color":"vip","tag":"大佬"},{"name":"清羽飞扬","link":"https://blog.liushen.fun/","avatar":"https://blog.liushen.fun/info/avatar.ico","descr":"柳影曳曳，清酒孤灯，扬笔撒墨，心境如霜","siteshot":"https://blog.liushen.fun/info/siteshot.jpg","atom(options)":"https://blog.liushen.fun/atom.xml","color":"vip","tag":"技术大佬"},{"name":"小亮的部落阁","link":"https://blog.752132.xyz/","avatar":"https://z.wiki/u/KqIZzi","descr":"欲望以提升热忱，毅力以磨平高山","siteshot":"https://z.wiki/u/2cXqKC","color":"vip","tag":"博客"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":false,"color":"vip","tag":"主题の作者"},{"name":"GoodBoyboy 's Blog","link":"https://blog.goodboyboy.top/","avatar":"https://gravatar.goodboyboy.top/avatar/9da9d1d515d273d4794015f2321f6e04?s=96&d=monsterid&r=g","descr":"惬意小屋-点滴记忆","siteshot":"https://cdn.tulan.cyou/noah/2025/08/16/0d5b6258f403117220455bdeae289391.png","color":"vip","tag":"高级","recommend":false},{"name":"龙星划空","link":"https://blog.245179.xyz/","descr":"人生近看是悲剧，远看是喜剧","avatar":"https://blog.245179.xyz/images/atiq.png","siteshot":"https://blog.245179.xyz/images/web.png","color":"vip","tag":"好友","recommend":false},{"name":"梦爱吃鱼","link":"https://blog.bsgun.cn/","avatar":"https://oss-cdn.bsgun.cn/logo/avatar.256.png","descr":"不负心灵，不负今生。","siteshot":"https://cdn.tulan.cyou/noah/2025/08/16/0d5b6258f403117220455bdeae289391.png","color":"vip","tag":"大佬","recommend":false},{"name":"清羽飞扬","link":"https://blog.liushen.fun/","avatar":"https://blog.liushen.fun/info/avatar.ico","descr":"柳影曳曳，清酒孤灯，扬笔撒墨，心境如霜","siteshot":"https://blog.liushen.fun/info/siteshot.jpg","atom(options)":"https://blog.liushen.fun/atom.xml","color":"vip","tag":"技术大佬","recommend":false},{"name":"Wer Blog","link":"https://blog.isyyo.com","avatar":"https://blog.isyyo.com/favicon/logo.png","descr":"The only way to do great is to love what you do","siteshot":"https://cdn.tulan.cyou/noah/2025/08/16/4f6d4e7d-3a0a-465d-affc-8f2f373bac4c.png","atom(options)":"https://blog.liushen.fun/atom.xml","color":"vip","tag":"技术大佬","recommend":false},{"name":"Mo的记事簿","link":"https://blog.xiowo.net/","avatar":"https://blog.xiowo.net/img/avatar.png","descr":"万年鸽王，哈哈OvO","siteshot":"https://bu.dusays.com/2025/06/17/685044d6bca69.png","color":"vip","tag":"技术大佬"},{"name":"fishcpy的小破站","link":"https://blog.fis.ink","avatar":"https://www.fis.ink/img/logo.png","descr":"非淡泊无以明志，非宁静无以致远","siteshot":"https://bu.dusays.com/2025/06/17/685044d6bca69.png","color":"vip","tag":"博客"},{"name":"小亮的部落阁","link":"https://blog.752132.xyz/","avatar":"https://z.wiki/u/KqIZzi","descr":"欲望以提升热忱，毅力以磨平高山","siteshot":"https://z.wiki/u/2cXqKC","color":"vip","tag":"博客"},{"name":"青序栈","link":"https://blog.752132.xyz/","avatar":"https://qxzhan.cn/favicon.png","descr":"青序成栈·向简而生","siteshot":"https://qxzhan.cn/favicon.png","color":"vip","tag":"生活"}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };