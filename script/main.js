var resolvePlayerInfo = require("@akashic-extension/resolve-player-info").resolvePlayerInfo;

function main(param) {
  // 初期処理
  let gameMasterID = null;
  g.game.join.addOnce(e =>{
    gameMasterID = e.player.id;
  });

  let quizid = "";
  let quizname = "";
  let quiz_num = 0;
  let quiz_num_now = 0;

  let your_score = 0;
  let your_ans = [];
  let quiz_ans = [];

  let now_select;
  
  let quiz_join_member = 0;
  let yourjoinstatus = "no";

  let playersTable = {};
  g.game.onPlayerInfo.add(function(ev){
    var player = ev.player;
    playersTable[player.id] = {
      name: player.name,
      score: 0
    };
    quiz_join_member = quiz_join_member + 1;
  });

  let gamestatus = "GameMasterWaiting";

  let font = new g.DynamicFont({
    game: g.game,
    fontFamily: "sans-serif",
    size: 50
  });

  //クイズ追加時記載場所
  const quizids = ["9","000000","000001","000002","000003","252539"];
  function quiz_setting(){
    if(quizid == "9"){
      quizid = "9"
      quizname = "debug";
      quiz_num = 1;
      quiz_ans = ["a"];
    }
    if(quizid == "252539"){
      quizid = "252539"
      quizname = "超検定2021テストプレイ";
      quiz_num = 5;
      quiz_ans = ["a","c","d","a","a"];
    }
    if(quizid == "000000"){
      quizid = "000000"
      quizname = "テスト問題00";
      quiz_num = 5;
      quiz_ans = ["a","d","b","a","c"];
    }
    if(quizid == "000001"){
      quizid = "000001"
      quizname = "テスト問題01";
      quiz_num = 5;
      quiz_ans = ["a","c","b","b","a"];
    }
    if(quizid == "000002"){
      quizid = "000002"
      quizname = "テスト問題02";
      quiz_num = 10;
      quiz_ans = ["a","c","b","b","a","a","c","b","d","d"];
    }
    if(quizid == "000003"){
      quizid = "000003"
      quizname = "テスト問題03";
      quiz_num = 20;
      quiz_ans = ["d","c","a","a","a","b","d","d","c","a","a","c","c","d","d","c","b","c","c","a"]
    }
  }
  //ここまで



  //==============


  //毎フレーム処理
  function mainLoop(){
    if(gamestatus == "GameMasterWaiting"){
      if(gameMasterID != null){
        gamestatus = "EntryUserWaiting";
        onGameMasterArrive();
      }
    }

    if(gamestatus == "EntryUserWaiting"){
      //todo?
    }

    if(gamestatus == "GameStart"){
      //todo
    }

    if(gamestatus == "result"){
      //???
    }
  }


  //==============


  //待機シーン
  var waiting_scene = new g.Scene({
    game: g.game,
    // このシーンで利用するアセットのIDを列挙し、シーンに通知します
    assetIds:["logo","but_sanka","but_shimekiri","popup_uketsuke","but_ok","massage_taiki","but_id","key_0","key_1","key_2","key_3","key_4","key_5","key_6","key_7","key_8","key_9","but_s_ok","but_s_back","popup_startcheck","but_yes","but_no"]
  });
  g.game.pushScene(waiting_scene);
  waiting_scene.onLoad.add(function () {
    const underline = new g.FilledRect({
        scene: waiting_scene,
        width: g.game.width,
        height: 50/1.5 ,
        cssColor: "#2ea7e0",
        x: 0,
        y: 985/1.5
    });
    const logo = new g.Sprite({
      scene: waiting_scene,
      src: waiting_scene.asset.getImageById("logo"),
      scaleX: 0.667,
      scaleY: 0.667,
      x: 100/1.5,
      y: 675/1.5
    });
    waiting_scene.append(underline);
    waiting_scene.append(logo);
  });

  function onGameMasterArrive(){
    if(g.game.selfId == gameMasterID){
      const entryclose_but = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("but_shimekiri"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 1350/1.5,
        y: 785/1.5,
        local: true,
        touchable: true
      });
      const popup_quiz_start = new g.E({
        scene: waiting_scene
      });
      const popup_quiz_start_dialog = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("popup_startcheck"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 320/1.5,
        y: 180/1.5,
        local: true
      });
      const popup_yes_but = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("but_yes"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 1075/1.5,
        y: 700/1.5,
        local: true,
        touchable: true
      })
      const popup_no_but = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("but_no"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 520/1.5,
        y: 700/1.5,
        local: true,
        touchable: true
      })
      popup_quiz_start.append(popup_quiz_start_dialog);
      popup_quiz_start.append(popup_yes_but);
      popup_quiz_start.append(popup_no_but);

      const idinput_but = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("but_id"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 1350/1.5,
        y: 215/1.5,
        local: true,
        touchable: true
      });
      const assistant_disp = new g.Label({
        scene: waiting_scene,
        font: font,
        text: "IDを入力してください",
        fontSize: 50/1.5,
        textColor: "black",
        x: 25/1.5,
        y: 1000/1.5
      });
      const tenkey = new g.E({
        scene: waiting_scene
      });
      const tenkey_0 = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("key_0"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 806/1.5,
        y: 860/1.5,
        local: true,
        touchable: true
      });
      const tenkey_1 = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("key_1"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 480/1.5,
        y: 635/1.5,
        local: true,
        touchable: true
      });
      const tenkey_2 = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("key_2"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 806/1.5,
        y: 635/1.5,
        local: true,
        touchable: true
      });
      const tenkey_3 = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("key_3"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 1133/1.5,
        y: 635/1.5,
        local: true,
        touchable: true
      });
      const tenkey_4 = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("key_4"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 480/1.5,
        y: 415/1.5,
        local: true,
        touchable: true
      });
      const tenkey_5 = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("key_5"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 806/1.5,
        y: 415/1.5,
        local: true,
        touchable: true
      });
      const tenkey_6 = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("key_6"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 1133/1.5,
        y: 415/1.5,
        local: true,
        touchable: true
      });
      const tenkey_7 = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("key_7"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 480/1.5,
        y: 195/1.5,
        local: true,
        touchable: true
      });
      const tenkey_8 = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("key_8"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 806/1.5,
        y: 195/1.5,
        local: true,
        touchable: true
      });
      const tenkey_9 = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("key_9"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 1133/1.5,
        y: 195/1.5,
        local: true,
        touchable: true
      });
      const tenkey_ok = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("but_s_ok"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 1550/1.5,
        y: 835/1.5,
        local: true,
        touchable: true
      });
      const tenkey_back = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("but_s_back"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 70/1.5,
        y: 835/1.5,
        local: true,
        touchable: true
      });
      const tenkey_disp = new g.Label({
        scene: waiting_scene,
        font: font,
        text: "",
        fontSize: 110/1.5,
        textColor: "black",
        x: 630/1.5,
        y: 50/1.5
      });
      tenkey.append(tenkey_0);
      tenkey.append(tenkey_1);
      tenkey.append(tenkey_2);
      tenkey.append(tenkey_3);
      tenkey.append(tenkey_4);
      tenkey.append(tenkey_5);
      tenkey.append(tenkey_6);
      tenkey.append(tenkey_7);
      tenkey.append(tenkey_8);
      tenkey.append(tenkey_9);
      tenkey.append(tenkey_ok);
      tenkey.append(tenkey_back);
      tenkey.append(tenkey_disp);
      tenkey_0.pointDown.add(function(){
        quizid = quizid + "0";
        tenkey_disp.text = quizid;
        tenkey_disp.invalidate();
      });
      tenkey_1.pointDown.add(function(){
        quizid = quizid + "1";
        tenkey_disp.text = quizid;
        tenkey_disp.invalidate();
      });
      tenkey_2.pointDown.add(function(){
        quizid = quizid + "2";
        tenkey_disp.text = quizid;
        tenkey_disp.invalidate();
      });
      tenkey_3.pointDown.add(function(){
        quizid = quizid + "3";
        tenkey_disp.text = quizid;
        tenkey_disp.invalidate();
      });
      tenkey_4.pointDown.add(function(){
        quizid = quizid + "4";
        tenkey_disp.text = quizid;
        tenkey_disp.invalidate();
      });
      tenkey_5.pointDown.add(function(){
        quizid = quizid + "5";
        tenkey_disp.text = quizid;
        tenkey_disp.invalidate();
      });
      tenkey_6.pointDown.add(function(){
        quizid = quizid + "6";
        tenkey_disp.text = quizid;
        tenkey_disp.invalidate();
      });
      tenkey_7.pointDown.add(function(){
        quizid = quizid + "7";
        tenkey_disp.text = quizid;
        tenkey_disp.invalidate();
      });
      tenkey_8.pointDown.add(function(){
        quizid = quizid + "8";
        tenkey_disp.text = quizid;
        tenkey_disp.invalidate();
      });
      tenkey_9.pointDown.add(function(){
        quizid = quizid + "9";
        tenkey_disp.text = quizid;
        tenkey_disp.invalidate();
      });

      popup_yes_but.pointDown.add(function(){

        if(quizids.includes(quizid)){
          waiting_scene.remove(popup_quiz_start);
          g.game.raiseEvent(new g.MessageEvent({message: "EntryClosed"}));
        }else{
          console.warn("問題が存在しません");
        }
        
      });
      popup_no_but.pointDown.add(function(){
        waiting_scene.remove(popup_quiz_start);
        waiting_scene.append(entryclose_but);
        waiting_scene.append(idinput_but);
      });

      tenkey_ok.pointDown.add(function(){
        waiting_scene.remove(tenkey);
        waiting_scene.append(entryclose_but);
        waiting_scene.append(idinput_but);


        if(quizids.includes(quizid)){
          quiz_setting();
        }else{
          quizname = "問題が存在しません";
        }
        assistant_disp.text = quizid + "：" + quizname;
        assistant_disp.invalidate();

        
        waiting_scene.append(assistant_disp);
      });
      tenkey_back.pointDown.add(function(){
        waiting_scene.remove(tenkey);
        waiting_scene.append(entryclose_but);
        waiting_scene.append(idinput_but);

        quizid = "";
      });


      //gamemaster
      waiting_scene.append(entryclose_but);
      waiting_scene.append(idinput_but);
      waiting_scene.append(assistant_disp);

      idinput_but.pointDown.add(function(){
        quizid = "";
        tenkey_disp.text = quizid;
        tenkey_disp.invalidate();
        waiting_scene.remove(entryclose_but);
        waiting_scene.remove(idinput_but);
        waiting_scene.remove(assistant_disp);
        waiting_scene.append(tenkey);
      });
      entryclose_but.pointDown.add(function(){
        waiting_scene.remove(entryclose_but);
        waiting_scene.remove(idinput_but);
        waiting_scene.append(popup_quiz_start);
      });


    }else{
      const entry_but = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("but_sanka"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 1350/1.5,
        y: 785/1.5,
        local: true,
        touchable: true
      });
      const popup_entry = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("popup_uketsuke"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 320/1.5,
        y: 180/1.5,
        local: true
      });
      const popup_entry_ok = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("but_ok"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 740/1.5,
        y: 700/1.5,
        local: true,
        touchable: true
      });
      const waiting = new g.Sprite({
        scene: waiting_scene,
        src: waiting_scene.asset.getImageById("massage_taiki"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 1435/1.5,
        y: 830/1.5,
        local: true
      });

      //user
      waiting_scene.append(entry_but);
      entry_but.pointDown.add(function(){
        waiting_scene.remove(entry_but);
        waiting_scene.append(waiting);

        resolvePlayerInfo({raises: true});
        yourjoinstatus = "yes";

        waiting_scene.append(popup_entry);
        waiting_scene.append(popup_entry_ok);
      });
      popup_entry_ok.pointDown.add(function(){
        waiting_scene.remove(popup_entry);
        waiting_scene.remove(popup_entry_ok);
      });
      
    }
  }

  waiting_scene.update.add(mainLoop);
  waiting_scene.message.add((ev) =>{
    if(ev.data.message == "EntryClosed"){
      gamestatus = "GameStart";
      QuizStart();
    }
  });


  //==============



  function QuizStart(){
    //ゲームシーン
    const game_scene = new g.Scene({
      game: g.game,
      assetIds:["joinmember","quiz_next","quiz_now","quiz_prev","quiz_selector_a","quiz_selector_b","quiz_selector_c","quiz_selector_d","quiz_select_border_g","quiz_wait","waiting","no_join_message","but_happyou","quiz_open","select"]
    });
    g.game.replaceScene(game_scene);
    game_scene.onLoad.add(function(){
      quiz_setting();

      const status = new g.E({
        scene: game_scene
      });
      const status_wait = new g.Sprite({
        scene: game_scene,
        src: game_scene.asset.getImageById("waiting"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 1417/1.5,
        y: 30/1.5
      });
      const status_member = new g.Sprite({
        scene: game_scene,
        src: game_scene.asset.getImageById("joinmember"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 1417/1.5,
        y: 30/1.5
      });
      const status_member_num = new g.Label({
        scene: game_scene,
        font: font,
        text: Object.keys(playersTable).length + "",
        fontSize: 75/1.5,
        textColor: "white",
        anchorX: 0.5,
        x: 1565/1.5,
        y: 52/1.5
      });
      let status_now_quiz = new g.Label({
        scene: game_scene,
        font: font,
        text: quiz_num_now + " / " + quiz_num,
        fontSize: 75/1.5,
        textColor: "black",
        x: 310/1.5,
        y: 50/1.5
      });
      status_member_num.modified();
      status.append(status_member);
      status.append(status_member_num);
      status.append(status_wait);
      status.append(status_now_quiz);

      game_scene.append(status);

      var open_member_counter = function(){
        status.remove(status_wait);
      };
      setTimeout(open_member_counter, 2000);

      const quiz_dialog = new g.E({
        scene: game_scene
      });
      const quiz_selector = new g.E({
        scene: game_scene
      });
      const open_result_but = new g.Sprite({
        scene: game_scene,
        src: game_scene.asset.getImageById("but_happyou"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 1350/1.5,
        y: 785/1.5,
        local: true,
        touchable: true
      });
      open_result_but.pointDown.add(function(){
        g.game.raiseEvent(new g.MessageEvent({message: "open_result"}));
      });


      if(g.game.selfId == gameMasterID){
        
        g.game.raiseEvent(new g.MessageEvent({message: "id:"+quizid}));
        const quiz_next_but = new g.Sprite({
          scene: game_scene,
          src: game_scene.asset.getImageById("quiz_next"),
          scaleX: 0.667,
          scaleY: 0.667,
          x: 1550/1.5,
          y: 835/1.5,
          local: true,
          touchable: true
        });
        const quiz_prev_but = new g.Sprite({
          scene: game_scene,
          src: game_scene.asset.getImageById("quiz_prev"),
          scaleX: 0.667,
          scaleY: 0.667,
          x: 70/1.5,
          y: 835/1.5,
          local: true,
          touchable: true
        });
        quiz_dialog.append(quiz_next_but);
        quiz_dialog.append(quiz_prev_but);
        
        game_scene.append(quiz_dialog);

        quiz_next_but.pointDown.add(function(){
          g.game.raiseEvent(new g.MessageEvent({message: "AnswerClosed"}));
        })

      }else{
        if(yourjoinstatus == "yes"){
          const quiz_waiting = new g.Sprite({
            scene: game_scene,
            src: game_scene.asset.getImageById("quiz_wait"),
            scaleX: 0.667,
            scaleY: 0.667,
            x: 432/1.5,
            y: 820/1.5,
            local: true
          });
          const quiz_selector_a = new g.Sprite({
            scene: game_scene,
            src: game_scene.asset.getImageById("quiz_selector_a"),
            scaleX: 0.667,
            scaleY: 0.667,
            x: 60/1.5,
            y: 665/1.5,
            local: true,
            touchable: true
          });
          const quiz_selector_b = new g.Sprite({
            scene: game_scene,
            src: game_scene.asset.getImageById("quiz_selector_b"),
            scaleX: 0.667,
            scaleY: 0.667,
            x: 975/1.5,
            y: 665/1.5,
            local: true,
            touchable: true
          });
          const quiz_selector_c = new g.Sprite({
            scene: game_scene,
            src: game_scene.asset.getImageById("quiz_selector_c"),
            scaleX: 0.667,
            scaleY: 0.667,
            x: 60/1.5,
            y: 865/1.5,
            local: true,
            touchable: true
          });
          const quiz_selector_d = new g.Sprite({
            scene: game_scene,
            src: game_scene.asset.getImageById("quiz_selector_d"),
            scaleX: 0.667,
            scaleY: 0.667,
            x: 975/1.5,
            y: 865/1.5,
            local: true,
            touchable: true
          });
          let quiz_select_border = new g.Sprite({
            scene: game_scene,
            src: game_scene.asset.getImageById("quiz_select_border_g"),
            scaleX: 0.667,
            scaleY: 0.667,
            local: true
          });
  
          quiz_selector.append(quiz_selector_a);
          quiz_selector.append(quiz_selector_b);
          quiz_selector.append(quiz_selector_c);
          quiz_selector.append(quiz_selector_d);
          game_scene.append(quiz_waiting);

          quiz_selector_a.pointDown.add(function(){
            game_scene.remove(quiz_select_border);
            quiz_select_border.x = quiz_selector_a.x;
            quiz_select_border.y = quiz_selector_a.y;
            quiz_select_border.modified();
            game_scene.append(quiz_select_border);
            now_select = "a";
            game_scene.asset.getAudioById("select").play();
          });
          quiz_selector_b.pointDown.add(function(){
            game_scene.remove(quiz_select_border);
            quiz_select_border.x = quiz_selector_b.x;
            quiz_select_border.y = quiz_selector_b.y;
            quiz_select_border.modified();
            game_scene.append(quiz_select_border);
            now_select = "b";
            game_scene.asset.getAudioById("select").play();
          });
          quiz_selector_c.pointDown.add(function(){
            game_scene.remove(quiz_select_border);
            quiz_select_border.x = quiz_selector_c.x;
            quiz_select_border.y = quiz_selector_c.y;
            quiz_select_border.modified();
            game_scene.append(quiz_select_border);
            now_select = "c";
            game_scene.asset.getAudioById("select").play();
          });
          quiz_selector_d.pointDown.add(function(){
            game_scene.remove(quiz_select_border);
            quiz_select_border.x = quiz_selector_d.x;
            quiz_select_border.y = quiz_selector_d.y;
            quiz_select_border.modified();
            game_scene.append(quiz_select_border);
            now_select = "d";
            game_scene.asset.getAudioById("select").play();
          });


          game_scene.message.add((ev) =>{
            if(ev.data.message == "AnswerClosed"){
              if(quiz_num_now == 0){
                game_scene.remove(quiz_waiting);
                game_scene.append(quiz_selector);
              }else{
                game_scene.remove(quiz_select_border);
                save_anser();
              }

            }
          });
            
          

        }else{
          const no_join_message = new g.Sprite({
            scene: game_scene,
            src: game_scene.asset.getImageById("no_join_message"),
            scaleX: 0.667,
            scaleY: 0.667,
            x: 432/1.5,
            y: 820/1.5,
            local: true
          });
          game_scene.append(no_join_message);

          var no_join_status_message = function(){
            game_scene.remove(no_join_message);
          };
          setTimeout(no_join_status_message, 7500);

        }
        
      }

      game_scene.message.add((ev) =>{
        //クイズ問題追加時記載場所
        if(ev.data.message == "id:9"){
          quizid = "9";
          quiz_setting();
          status_now_quiz.invalidate();
        }
        if(ev.data.message == "id:252539"){
          quizid = "252539";
          quiz_setting();
          status_now_quiz.invalidate();
        }
        if(ev.data.message == "id:000000"){
          quizid = "000000";
          quiz_setting();
          status_now_quiz.invalidate();
        }
        if(ev.data.message == "id:000001"){
          quizid = "000001";
          quiz_setting();
          status_now_quiz.invalidate();
        }
        if(ev.data.message == "id:000002"){
          quizid = "000002";
          quiz_setting();
          status_now_quiz.invalidate();
        }
        if(ev.data.message == "id:000003"){
          quizid = "000003";
          quiz_setting();
          status_now_quiz.invalidate();
        }

        if(ev.data.message == "AnswerClosed"){
          quiz_num_now = quiz_num_now + 1;
          status_now_quiz.text = quiz_num_now + " / " + quiz_num;
          status_now_quiz.invalidate();
          
          
          if(!(quiz_num_now > quiz_num)){
            game_scene.asset.getAudioById("quiz_open").play();
          }

          if(quiz_num_now > quiz_num){
            game_scene.append(status_wait);
            status.remove(status_now_quiz);
            if(g.game.selfId == gameMasterID){
              game_scene.remove(quiz_dialog);
              game_scene.append(open_result_but);
            }else{
              if(yourjoinstatus == "yes"){
                game_scene.remove(quiz_selector);
              }
            }
          }
        }

        if(ev.data.message == "open_result"){
          check_answer();
        }
      });


    });
    game_scene.update.add(mainLoop);
  }

  function save_anser(){
    your_ans[(quiz_num_now - 1)] = now_select;
  };



  function check_answer(){
    const check_answer_scene = new g.Scene({
      game: g.game,
      assetIds:["result_header","result_o","result_x","but_ranking"]
    });
    g.game.replaceScene(check_answer_scene);

    check_answer_scene.onLoad.add(function(){
      const result_header = new g.Sprite({
        scene: check_answer_scene,
        src: check_answer_scene.asset.getImageById("result_header"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 5/1.5,
        y: 28/1.5
      });
      const result_header_label = new g.Label({
        scene: check_answer_scene,
        local: true,
        font: font,
        text: "",
        fontSize: 50,
        textColor: "black",
        x: g.game.width/1.75,
        y:50/1.5
      });

      if(g.game.selfId == gameMasterID){
        //GM
        result_header_label.text = "結果発表中です。";

        const result_ranking_but = new g.Sprite({
          scene: check_answer_scene,
          src: check_answer_scene.asset.getImageById("but_ranking"),
          scaleX: 0.667,
          scaleY: 0.667,
          x: 1350/1.5,
          y: 785/1.5,
          local: true,
          touchable: true
        });
        result_ranking_but.pointDown.add(function(){
          g.game.raiseEvent(new g.MessageEvent({message: "open_ranking"}));
        });
        check_answer_scene.append(result_ranking_but);

        //正答率受信
        check_answer_scene.message.add((ev) =>{
          //TODO 正解した情報を受信してその問題の正答率を出したい
        });

      }else{
        if(yourjoinstatus == "yes"){
          //参加者
          result_header_label.text = playersTable[g.game.selfId].name + "さんの採点結果";
          result_header_label.x = 1280/2;
          result_header_label.invalidate();

          //採点発表
          const result_panel = new g.E({
            scene: check_answer_scene,
            touchable: true,
            local: true
          })
          for(var i=0; i < quiz_num; i++){
            var answer_panel = new g.FilledRect({
              scene: check_answer_scene,
              cssColor: "white",
              width: 330,
              height: 360,
              scaleX: 0.667,
              scaleY: 0.667,
              parrent: result_panel,
              local: true
            });
            var answer_quiz_label = new g.Label({
              scene: check_answer_scene,
              font: font,
              text: "第" + (i+1) + "問",
              fontSize: 65/1.5,
              textColor: "black",
              parrent:result_panel,
              local: true
            });
    
            if(your_ans[i] == quiz_ans[i]){
              var answer_ox = new g.Sprite({
                scene: check_answer_scene,
                src: check_answer_scene.asset.getImageById("result_o"),
                scaleX: 0.667,
                scaleY: 0.667,
                parrent:result_panel,
                local: true
              });
              
              //スコア加算・GM用正答率送信
              your_score = your_score + (100/quiz_num);
              g.game.raiseEvent(new g.MessageEvent({ o_answer: i }));
            }else{
              var answer_ox = new g.Sprite({
                scene: check_answer_scene,
                src: check_answer_scene.asset.getImageById("result_x"),
                scaleX: 0.600,
                scaleY: 0.600,
                parrent:result_panel,
                local: true
              })
            };
    
            //Y座標指定
            if((0 <= i)&&(i <= 4)){
              answer_panel.y = 233/1.5;
              answer_quiz_label.y = 251/1.5;
              answer_ox.y = 353/1.5;
            }
            if((5 <= i)&&(i <= 9)){
              answer_panel.y = 631/1.5;
              answer_quiz_label.y = 658/1.5;
              answer_ox.y = 751/1.5;
            }
            if((10 <= i)&&(i <= 14)){
              answer_panel.y = 1047/1.5;
              answer_quiz_label.y = 1065/1.5;
              answer_ox.y = 1167/1.5;
            }
            if((15 <= i)&&(i <= 19)){
              answer_panel.y = 1463/1.5;
              answer_quiz_label.y = 1481/1.5;
              answer_ox.y = 1583/1.5;
            }
    
            //X座標指定
            if((i%5) == 0){
              answer_panel.x = 90/1.5;
              answer_quiz_label.x = 156/1.5;
              answer_ox.x = 145/1.5;
            }
            if((i%5) == 1){
              answer_panel.x = 446/1.5;
              answer_quiz_label.x = 512/1.5;
              answer_ox.x = 500/1.5;
            }
            if((i%5) == 2){
              answer_panel.x = 798/1.5;
              answer_quiz_label.x = 864/1.5;
              answer_ox.x = 853/1.5;
            }
            if((i%5) == 3){
              answer_panel.x = 1157/1.5;
              answer_quiz_label.x = 1223/1.5;
              answer_ox.x = 1221/1.5;
            }
            if((i%5) == 4){
              answer_panel.x = 1512/1.5;
              answer_quiz_label.x = 1578/1.5;
              answer_ox.x = 1566/1.5;
            }
    
            //reset
            answer_panel.modified();
            answer_ox.modified();
            answer_quiz_label.invalidate();
            result_panel.append(answer_panel);
            result_panel.append(answer_ox);
            result_panel.append(answer_quiz_label);
            result_panel.modified();
          };
          check_answer_scene.append(result_panel);
          
          //スコア送信
          g.game.raiseEvent(new g.MessageEvent({ score: your_score }));

          if(quiz_num >= 10){
            result_panel.onUpdate.add(function() {
              --result_panel.y;
              result_panel.modified();

              if(result_panel.y < -800){
                result_panel.y = 100;
                result_panel.modified();
              }
            });
          }

        }else{
          //未参加者
          result_header_label.text = "結果発表中です。";
        }
      }

      result_header_label.invalidate();
      result_header.append(result_header_label);
      check_answer_scene.append(result_header);

      //スコア受信・移動
      check_answer_scene.message.add((ev) =>{
        if(ev.data.score){
          playersTable[ev.player.id].score = ev.data.score;
        }
        if(ev.data.message == "open_ranking"){
          result_ranking();
        }
      });
      

    });
  }


  function result_ranking(){
    const ranking_scene = new g.Scene({
      game: g.game,
      assetIds:["ranking_bg","joinmember","font","font_glyphs"]
    });
    g.game.replaceScene(ranking_scene);
    ranking_scene.onLoad.add(function(){

      // 背景etc
      const ranking_bg = new g.Sprite({
        scene: ranking_scene,
        src: ranking_scene.asset.getImageById("ranking_bg"),
        scaleX: 0.667,
        scaleY: 0.667,
      });
      const join_member_bg = new g.Sprite({
        scene: ranking_scene,
        src: ranking_scene.asset.getImageById("joinmember"),
        scaleX: 0.667,
        scaleY: 0.667,
        x: 1417/1.5,
        y: 30/1.5
      });
      const join_member_label = new g.Label({
        scene: ranking_scene,
        font: font,
        text: Object.keys(playersTable).length + "",
        fontSize: 75/1.5,
        textColor: "white",
        x: 1545/1.5,
        y: 52/1.5
      });
      ranking_scene.append(ranking_bg);
      ranking_scene.append(join_member_bg);
      ranking_scene.append(join_member_label);

      // ビットマップフォントを生成
      var fontAsset = g.game.scene().asset.getImageById("font");
      var fontGlyphAsset = g.game.scene().asset.getTextById("font_glyphs");
      var glyphInfo = JSON.parse(fontGlyphAsset.data);
      var scorefont = new g.BitmapFont({
        src: fontAsset,
        glyphInfo: glyphInfo
      });

      //あなたの点数
      var yourname = "あなたは参加していません";
      var yourscore = 0;
      if(playersTable[g.game.selfId]){
        yourname = playersTable[g.game.selfId].name + " さん";
        yourscore = playersTable[g.game.selfId].score;
      }
      const ranking_your_name_label = new g.Label({
        scene: ranking_scene,
        font: font,
        text: yourname,
        fontSize: 65/1.5,
        textColor: "black",
        x: 350/1.5,
        y: 945/1.5
      });
      const ranking_your_score_label = new g.Label({
        scene: ranking_scene,
        font: scorefont,
        text: yourscore + "",
        fontSize: 100,
        textColor: "red",
        scaleX: 0.75,
        anchorX: 0.5,
        x: 1650/1.5,
        y: 935/1.5
      });
      ranking_scene.append(ranking_your_name_label);
      ranking_scene.append(ranking_your_score_label);

      //ランキング
      const ranking_topFive = Object.keys(playersTable).map(id => {
      return { score: playersTable[id], id: id };
      }).sort((a, b) => {
        return b.score.score - a.score.score;
      }).slice(0, 5);
      var tai_counts = 0;
      const ranking = Object.keys(playersTable).map(id => {
        return { score: playersTable[id], id: id };
        }).sort((a, b) => {
          return b.score.score - a.score.score;
        });

      if(ranking_topFive[0]){
        const ranking_1st_name_label = new g.Label({
          scene: ranking_scene,
          font: font,
          text: ranking_topFive[0].score.name + " さん",
          fontSize: 65/1.5,
          textColor: "black",
          x: 350/1.5,
          y: 200/1.5
        });
        const ranking_1st_score_label = new g.Label({
          scene: ranking_scene,
          font: scorefont,
          text: ranking_topFive[0].score.score + "",
          fontSize: 100,
          textColor: "red",
          scaleX: 0.75,
          anchorX: 0.5,
          x: 1650/1.5,
          y: 190/1.5
        });
        ranking_scene.append(ranking_1st_name_label);
        ranking_scene.append(ranking_1st_score_label);
      }
      if(ranking_topFive[1]){
        const ranking_2nd_name_label = new g.Label({
          scene: ranking_scene,
          font: font,
          text: ranking_topFive[1].score.name + " さん",
          fontSize: 65/1.5,
          textColor: "black",
          x: 350/1.5,
          y: 350/1.5
        });
        const ranking_2nd_score_label = new g.Label({
          scene: ranking_scene,
          font: scorefont,
          text: ranking_topFive[1].score.score + "",
          fontSize: 100,
          textColor: "red",
          scaleX: 0.75,
          anchorX: 0.5,
          x: 1650/1.5,
          y: 325/1.5
        });
        ranking_scene.append(ranking_2nd_name_label);
        ranking_scene.append(ranking_2nd_score_label);
      }
      if(ranking_topFive[2]){
        const ranking_3rd_name_label = new g.Label({
          scene: ranking_scene,
          font: font,
          text: ranking_topFive[2].score.name + " さん",
          fontSize: 65/1.5,
          textColor: "black",
          x: 350/1.5,
          y: 500/1.5
        });
        const ranking_3rd_score_label = new g.Label({
          scene: ranking_scene,
          font: scorefont,
          text: ranking_topFive[2].score.score + "",
          fontSize: 100,
          textColor: "red",
          scaleX: 0.75,
          anchorX: 0.5,
          x: 1650/1.5,
          y: 475/1.5
        });
        ranking_scene.append(ranking_3rd_name_label);
        ranking_scene.append(ranking_3rd_score_label);
      }
      if(ranking_topFive[3]){
        const ranking_4th_name_label = new g.Label({
          scene: ranking_scene,
          font: font,
          text: ranking_topFive[3].score.name + " さん",
          fontSize: 65/1.5,
          textColor: "black",
          x: 350/1.5,
          y: 650/1.5
        });
        const ranking_4th_score_label = new g.Label({
          scene: ranking_scene,
          font: scorefont,
          text: ranking_topFive[3].score.score + "",
          fontSize: 100,
          textColor: "red",
          scaleX: 0.75,
          anchorX: 0.5,
          x: 1650/1.5,
          y: 625/1.5
        });
        ranking_scene.append(ranking_4th_name_label);
        ranking_scene.append(ranking_4th_score_label);
      }
      if(ranking_topFive[4]){
        const ranking_5th_name_label = new g.Label({
          scene: ranking_scene,
          font: font,
          text: ranking_topFive[4].score.name + " さん",
          fontSize: 65/1.5,
          textColor: "black",
          x: 350/1.5,
          y: 790/1.5
        });
        const ranking_5th_score_label = new g.Label({
          scene: ranking_scene,
          font: scorefont,
          text: ranking_topFive[4].score.score + "",
          fontSize: 100,
          textColor: "red",
          scaleX: 0.75,
          anchorX: 0.5,
          x: 1650/1.5,
          y: 775/1.5
        });
        ranking_scene.append(ranking_5th_name_label);
        ranking_scene.append(ranking_5th_score_label);

        //5位タイ
        for(var i = 4; (i < Object.keys(playersTable).length); i++){
          if(ranking_topFive[4].score.score == ranking[i].score.score){
            tai_counts = tai_counts + 1;
          }
        };
        if(tai_counts != 0){
          const ranking_5th_tai_label = new g.Label({
            scene: ranking_scene,
            font: font,
            text: "他" + tai_counts + "名",
            fontSize: 65/1.5,
            textColor: "black",
            anchorX: 0.5,
            x: 1430/1.5,
            y: 775/1.5
          });
          ranking_scene.append(ranking_5th_tai_label);
        }

      }

      var heikin = 0;
      for(var i = 0; i < Object.keys(playersTable).length;i++){
        heikin = heikin + ranking[i].score.score;
      }
      console.log("平均点: " + heikin / Object.keys(playersTable).length);


    });
  }

  //==============

/*
多分残ってるTODO
・GM：正答率集計/描画
*/



}
module.exports = main;
