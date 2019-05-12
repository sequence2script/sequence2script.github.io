var app = new Vue({
    el: '#seq2script',
    data: {
        data_gathering_mode: true,
        loading_mode: false,
        report_generated: "",
        error_happened: false,
        info: "",
        received_dt: "",
        collected_dt: "",
        sample_type: "",
        firstName: "",
        lastName: "",
        birthdate: "",
        phn: "",
        mrn: "",
        sex: "male",
        sCollected: "",
        sReceived: "",
        cyp2d6All1: "",
        cyp2d6All2: "",
        cyp2c19All1: "",
        cyp2c19All2: "",
        hlaaPn: "positive",
        hlabPn: "positive",
        referringDiag: "",
        referringClinician: "",
        referringClinic: "",
        labName: "",
        labAddr1: "",
        labAddr2: "",
        city: "",
        province: "",
        postalCode: "",
        report_generated: "",
        dataToBeSent: "",
        D6Phenotype: "",
        C19Phenotype: "",
        medicine_recommendations: [],
        cyp2d6All1_list: ['*1', '*2', ' *2', '*3', '*4', '*5', '*6', '*7', '*8', '*9', '*10', '*11', '*12', '*13', '*14', '*15', '*17', '*18', '*19', '*20', '*21', '*22', '*23', '*24', '*25', '*26', '*27', '*28', '*29', '*30', '*31', '*32', '*33', '*34', '*35', '*36', '*37', '*38', '*39', '*40', '*41', '*42', '*43', '*44', '*45', '*46', '*47', '*48', '*49', '*50', '*51', '*52', '*53', '*54', '*55', '*56', '*57', '*58', '*59', '*60', '*61', '*62', '*63', '*64', '*65', '*68', '*69', '*70', '*71', '*72', '*73', '*74', '*75', '*81', '*82', '*83', '*84', '*85', '*86', '*87', '*88', '*89', '*90', '*91', '*92', '*93', '*94', '*95', '*96', '*97', '*98', '*99', '*100', '*101', '*102', '*103', '*104', '*105', '*106', '*107', '*108', '*109', '*110', '*111', '*112', '*113', '*114', '*45xN>2', '*6xN', '*35xN>2', '*10x2', '*1xN>2', '*41x2', '*45x2', '*35x2', '*29x2', '*43xN', '*2 ', '*17x2', '*4xN', '*2x2', '*9x2', '*36xN', '*2xN>2', '*1x2', '*3xN'],
        cyp2d6All2_list: ['*1', '*2', ' *2', '*3', '*4', '*5', '*6', '*7', '*8', '*9', '*10', '*11', '*12', '*13', '*14', '*15', '*17', '*18', '*19', '*20', '*21', '*22', '*23', '*24', '*25', '*26', '*27', '*28', '*29', '*30', '*31', '*32', '*33', '*34', '*35', '*36', '*37', '*38', '*39', '*40', '*41', '*42', '*43', '*44', '*45', '*46', '*47', '*48', '*49', '*50', '*51', '*52', '*53', '*54', '*55', '*56', '*57', '*58', '*59', '*60', '*61', '*62', '*63', '*64', '*65', '*68', '*69', '*70', '*71', '*72', '*73', '*74', '*75', '*81', '*82', '*83', '*84', '*85', '*86', '*87', '*88', '*89', '*90', '*91', '*92', '*93', '*94', '*95', '*96', '*97', '*98', '*99', '*100', '*101', '*102', '*103', '*104', '*105', '*106', '*107', '*108', '*109', '*110', '*111', '*112', '*113', '*114', '*45xN>2', '*6xN', '*35xN>2', '*10x2', '*1xN>2', '*41x2', '*45x2', '*35x2', '*29x2', '*43xN', '*2 ', '*17x2', '*4xN', '*2x2', '*9x2', '*36xN', '*2xN>2', '*1x2', '*3xN'],
        cyp2c19All1_list: ['*1', '*2', '*3', '*5', '*6', '*7', '*8', '*9', '*10', '*11', '*12', '*13', '*14', '*15', '*16', '*17', '*18', '*19', '*22', '*23', '*24', '*25', '*26', '*27', '*28', '*29', '*30', '*31', '*32', '*33', '*34', '*35', '*4A', '*4B'],
        cyp2c19All2_list: ['*1', '*2', '*3', '*5', '*6', '*7', '*8', '*9', '*10', '*11', '*12', '*13', '*14', '*15', '*16', '*17', '*18', '*19', '*22', '*23', '*24', '*25', '*26', '*27', '*28', '*29', '*30', '*31', '*32', '*33', '*34', '*35', '*4A', '*4B']

    },

    methods: {
        sendData: function(dataToBeSent) {
            //.log(dataToBeSent);
        },

        createReport: function() {
            this.$data.loading_mode = true;
            this.getInfo();

        },

        printReport: function() {
            window.print();  
        },

        gotoTop: function() {
            window.scrollTo(0,0);
        },

        gotoNewReport: function() {

            this.$data.data_gathering_mode = true;
            this.$data.loading_mode = false;
            this.$data.error_happened = false;

            this.gotoTop();

            // this.resetSelects();
            
        },


        resetSelects: function() {
            // alert("hi");
            // $('#cyp2d6All1').hide().select2();
            // $('#cyp2d6All2').hide().select2();
            // $('#cyp2c19All1').select2();
            // $('#cyp2c19All2').select2();
            // $('#sample_type').select2();
        },


        setData: function(response) {
            //alert("hi");
            //console.log(response.data.recommendations);
            this.$data.C19Phenotype = response.data.recommendations.methabolization_status.C19Phenotype;
            this.$data.D6Phenotype = response.data.recommendations.methabolization_status.D6Phenotype;
            this.$data.medicine_recommendations = response.data.recommendations.medicine_recommendations;
            this.$data.report_generated = response.data.time;
            
            

            setTimeout(function(){ 
                window.scrollTo(0,0);
             }, 50);

            

        },


        getInfo: function(dataToBeSent) {
            // console.log("cyp2c19:" +  this.$data.cyp2c19All1 + "/" +  this.$data.cyp2c19All2, 
            // "cyp2d6:" + this.$data.cyp2d6All1 + "/" +  this.$data.cyp2d6All2, 
            // "hlaa:" + this.$data.hlaaPn.toLowerCase(), "hlab:" + this.$data.hlabPn.toLowerCase());
            
            
            
            axios
                .post('https://e0ro9yiau5.execute-api.ca-central-1.amazonaws.com/test/report', 
                {"cyp2c19": this.$data.cyp2c19All1 + "/" +  this.$data.cyp2c19All2, 
                "cyp2d6": this.$data.cyp2d6All1 + "/" +  this.$data.cyp2d6All2, 
                "hlaa": this.$data.hlaaPn.toLowerCase(), "hlab": this.$data.hlabPn.toLowerCase()})
           
            .then(function(response) {
                //console.log(response);
                // alert(response);

                app.setData(response);
                app.$data.data_gathering_mode = false

            })
            .catch(function(error) {
                //alert("error!");
                app.$data.loading_mode = false;
                app.$data.data_gathering_mode = true;
                app.$data.error_happened = true;
                window.scrollTo(0, $("#error-msg-head").offset().top);

            });

            //this.$data.data_gathering_mode = false

            
            
        }

    }


    });
    // app.$data.report_generated = "May 11, 2019";
    




    $(function () {

        // var selectize = $('.beasts-selects').selectize({
        //     maxItems: 1
        // });

        // selectize.on('item_add', function () {
        //     selectize.close();
        //   });


        // var resetSelects = function() {
            $('#cyp2d6All1').select2();
            $('#cyp2d6All2').select2();
            $('#cyp2c19All1').select2();
            $('#cyp2c19All2').select2();
            $('#sample_type').select2();
        // }

        



        // $("#gotoNewReport").on("click", function() {
        //     resetSelects();
        //     app.$data.data_gathering_mode = true;
        // });



        $('#cyp2c19All2').on('select2:select', function (e) {
            app.$data.cyp2c19All2 = $(this).val();
            //console.log(app.$data.cyp2c19All2);
          });

          $('#cyp2c19All1').on('select2:select', function (e) {
            app.$data.cyp2c19All1 = $(this).val();
            //console.log(app.$data.cyp2c19All1);
          });

          $('#cyp2d6All1').on('select2:select', function (e) {
            app.$data.cyp2d6All1 = $(this).val();
            //console.log(app.$data.cyp2d6All1);
          });

          $('#cyp2d6All2').on('select2:select', function (e) {
            app.$data.cyp2d6All2 = $(this).val();
            //console.log(app.$data.cyp2d6All2);
          });

          $('#sample_type').on('select2:select', function (e) {
            app.$data.sample_type = $(this).val();
            //console.log(app.$data.cyp2d6All2);
          });


        


        $('.dtpicker').datetimepicker({
            //format: 'LT'
        });

        $('.dpicker').datetimepicker({
            format: 'DD/MM/YYYY'
        });


        $("#tool-info-h").on("click", function() {
            $("#tool-info-p").toggle();
        });

        $("#btn-get-report").on("click", function(){
            //console.log($("form").serialize());
            //console.log($("#birthdate").val());
            //app.sendData($("form").serialize());
        });

        // this.$data.sCollected = $("#s-collected-dt").val().replace(" ", " -- ");
        //     this.$data.sReceived = $("#s-received-dt").val().replace(" ", " -- ");
        //     this.$data.sReceived = $("#birthdate").val().replace(" ", " -- ");


        $("#s-collected-dt").blur(function() {
            app.$data.sCollected = $("#s-collected-dt").val().replace(" ", " -- ");
        });

        $("#s-received-dt").blur(function() {
            app.$data.sReceived = $("#s-received-dt").val().replace(" ", " -- ");
        });

        $("#birthdate").blur(function() {
            app.$data.birthdate = $("#birthdate").val().replace(" ", " -- ");
        });
        

    });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IG5ldyBWdWUoe1xuICAgIGVsOiAnI3NlcTJzY3JpcHQnLFxuICAgIGRhdGE6IHtcbiAgICAgICAgZGF0YV9nYXRoZXJpbmdfbW9kZTogdHJ1ZSxcbiAgICAgICAgbG9hZGluZ19tb2RlOiBmYWxzZSxcbiAgICAgICAgcmVwb3J0X2dlbmVyYXRlZDogXCJcIixcbiAgICAgICAgZXJyb3JfaGFwcGVuZWQ6IGZhbHNlLFxuICAgICAgICBpbmZvOiBcIlwiLFxuICAgICAgICByZWNlaXZlZF9kdDogXCJcIixcbiAgICAgICAgY29sbGVjdGVkX2R0OiBcIlwiLFxuICAgICAgICBzYW1wbGVfdHlwZTogXCJcIixcbiAgICAgICAgZmlyc3ROYW1lOiBcIlwiLFxuICAgICAgICBsYXN0TmFtZTogXCJcIixcbiAgICAgICAgYmlydGhkYXRlOiBcIlwiLFxuICAgICAgICBwaG46IFwiXCIsXG4gICAgICAgIG1ybjogXCJcIixcbiAgICAgICAgc2V4OiBcIm1hbGVcIixcbiAgICAgICAgc0NvbGxlY3RlZDogXCJcIixcbiAgICAgICAgc1JlY2VpdmVkOiBcIlwiLFxuICAgICAgICBjeXAyZDZBbGwxOiBcIlwiLFxuICAgICAgICBjeXAyZDZBbGwyOiBcIlwiLFxuICAgICAgICBjeXAyYzE5QWxsMTogXCJcIixcbiAgICAgICAgY3lwMmMxOUFsbDI6IFwiXCIsXG4gICAgICAgIGhsYWFQbjogXCJwb3NpdGl2ZVwiLFxuICAgICAgICBobGFiUG46IFwicG9zaXRpdmVcIixcbiAgICAgICAgcmVmZXJyaW5nRGlhZzogXCJcIixcbiAgICAgICAgcmVmZXJyaW5nQ2xpbmljaWFuOiBcIlwiLFxuICAgICAgICByZWZlcnJpbmdDbGluaWM6IFwiXCIsXG4gICAgICAgIGxhYk5hbWU6IFwiXCIsXG4gICAgICAgIGxhYkFkZHIxOiBcIlwiLFxuICAgICAgICBsYWJBZGRyMjogXCJcIixcbiAgICAgICAgY2l0eTogXCJcIixcbiAgICAgICAgcHJvdmluY2U6IFwiXCIsXG4gICAgICAgIHBvc3RhbENvZGU6IFwiXCIsXG4gICAgICAgIHJlcG9ydF9nZW5lcmF0ZWQ6IFwiXCIsXG4gICAgICAgIGRhdGFUb0JlU2VudDogXCJcIixcbiAgICAgICAgRDZQaGVub3R5cGU6IFwiXCIsXG4gICAgICAgIEMxOVBoZW5vdHlwZTogXCJcIixcbiAgICAgICAgbWVkaWNpbmVfcmVjb21tZW5kYXRpb25zOiBbXSxcbiAgICAgICAgY3lwMmQ2QWxsMV9saXN0OiBbJyoxJywgJyoyJywgJyAqMicsICcqMycsICcqNCcsICcqNScsICcqNicsICcqNycsICcqOCcsICcqOScsICcqMTAnLCAnKjExJywgJyoxMicsICcqMTMnLCAnKjE0JywgJyoxNScsICcqMTcnLCAnKjE4JywgJyoxOScsICcqMjAnLCAnKjIxJywgJyoyMicsICcqMjMnLCAnKjI0JywgJyoyNScsICcqMjYnLCAnKjI3JywgJyoyOCcsICcqMjknLCAnKjMwJywgJyozMScsICcqMzInLCAnKjMzJywgJyozNCcsICcqMzUnLCAnKjM2JywgJyozNycsICcqMzgnLCAnKjM5JywgJyo0MCcsICcqNDEnLCAnKjQyJywgJyo0MycsICcqNDQnLCAnKjQ1JywgJyo0NicsICcqNDcnLCAnKjQ4JywgJyo0OScsICcqNTAnLCAnKjUxJywgJyo1MicsICcqNTMnLCAnKjU0JywgJyo1NScsICcqNTYnLCAnKjU3JywgJyo1OCcsICcqNTknLCAnKjYwJywgJyo2MScsICcqNjInLCAnKjYzJywgJyo2NCcsICcqNjUnLCAnKjY4JywgJyo2OScsICcqNzAnLCAnKjcxJywgJyo3MicsICcqNzMnLCAnKjc0JywgJyo3NScsICcqODEnLCAnKjgyJywgJyo4MycsICcqODQnLCAnKjg1JywgJyo4NicsICcqODcnLCAnKjg4JywgJyo4OScsICcqOTAnLCAnKjkxJywgJyo5MicsICcqOTMnLCAnKjk0JywgJyo5NScsICcqOTYnLCAnKjk3JywgJyo5OCcsICcqOTknLCAnKjEwMCcsICcqMTAxJywgJyoxMDInLCAnKjEwMycsICcqMTA0JywgJyoxMDUnLCAnKjEwNicsICcqMTA3JywgJyoxMDgnLCAnKjEwOScsICcqMTEwJywgJyoxMTEnLCAnKjExMicsICcqMTEzJywgJyoxMTQnLCAnKjQ1eE4+MicsICcqNnhOJywgJyozNXhOPjInLCAnKjEweDInLCAnKjF4Tj4yJywgJyo0MXgyJywgJyo0NXgyJywgJyozNXgyJywgJyoyOXgyJywgJyo0M3hOJywgJyoyICcsICcqMTd4MicsICcqNHhOJywgJyoyeDInLCAnKjl4MicsICcqMzZ4TicsICcqMnhOPjInLCAnKjF4MicsICcqM3hOJ10sXG4gICAgICAgIGN5cDJkNkFsbDJfbGlzdDogWycqMScsICcqMicsICcgKjInLCAnKjMnLCAnKjQnLCAnKjUnLCAnKjYnLCAnKjcnLCAnKjgnLCAnKjknLCAnKjEwJywgJyoxMScsICcqMTInLCAnKjEzJywgJyoxNCcsICcqMTUnLCAnKjE3JywgJyoxOCcsICcqMTknLCAnKjIwJywgJyoyMScsICcqMjInLCAnKjIzJywgJyoyNCcsICcqMjUnLCAnKjI2JywgJyoyNycsICcqMjgnLCAnKjI5JywgJyozMCcsICcqMzEnLCAnKjMyJywgJyozMycsICcqMzQnLCAnKjM1JywgJyozNicsICcqMzcnLCAnKjM4JywgJyozOScsICcqNDAnLCAnKjQxJywgJyo0MicsICcqNDMnLCAnKjQ0JywgJyo0NScsICcqNDYnLCAnKjQ3JywgJyo0OCcsICcqNDknLCAnKjUwJywgJyo1MScsICcqNTInLCAnKjUzJywgJyo1NCcsICcqNTUnLCAnKjU2JywgJyo1NycsICcqNTgnLCAnKjU5JywgJyo2MCcsICcqNjEnLCAnKjYyJywgJyo2MycsICcqNjQnLCAnKjY1JywgJyo2OCcsICcqNjknLCAnKjcwJywgJyo3MScsICcqNzInLCAnKjczJywgJyo3NCcsICcqNzUnLCAnKjgxJywgJyo4MicsICcqODMnLCAnKjg0JywgJyo4NScsICcqODYnLCAnKjg3JywgJyo4OCcsICcqODknLCAnKjkwJywgJyo5MScsICcqOTInLCAnKjkzJywgJyo5NCcsICcqOTUnLCAnKjk2JywgJyo5NycsICcqOTgnLCAnKjk5JywgJyoxMDAnLCAnKjEwMScsICcqMTAyJywgJyoxMDMnLCAnKjEwNCcsICcqMTA1JywgJyoxMDYnLCAnKjEwNycsICcqMTA4JywgJyoxMDknLCAnKjExMCcsICcqMTExJywgJyoxMTInLCAnKjExMycsICcqMTE0JywgJyo0NXhOPjInLCAnKjZ4TicsICcqMzV4Tj4yJywgJyoxMHgyJywgJyoxeE4+MicsICcqNDF4MicsICcqNDV4MicsICcqMzV4MicsICcqMjl4MicsICcqNDN4TicsICcqMiAnLCAnKjE3eDInLCAnKjR4TicsICcqMngyJywgJyo5eDInLCAnKjM2eE4nLCAnKjJ4Tj4yJywgJyoxeDInLCAnKjN4TiddLFxuICAgICAgICBjeXAyYzE5QWxsMV9saXN0OiBbJyoxJywgJyoyJywgJyozJywgJyo1JywgJyo2JywgJyo3JywgJyo4JywgJyo5JywgJyoxMCcsICcqMTEnLCAnKjEyJywgJyoxMycsICcqMTQnLCAnKjE1JywgJyoxNicsICcqMTcnLCAnKjE4JywgJyoxOScsICcqMjInLCAnKjIzJywgJyoyNCcsICcqMjUnLCAnKjI2JywgJyoyNycsICcqMjgnLCAnKjI5JywgJyozMCcsICcqMzEnLCAnKjMyJywgJyozMycsICcqMzQnLCAnKjM1JywgJyo0QScsICcqNEInXSxcbiAgICAgICAgY3lwMmMxOUFsbDJfbGlzdDogWycqMScsICcqMicsICcqMycsICcqNScsICcqNicsICcqNycsICcqOCcsICcqOScsICcqMTAnLCAnKjExJywgJyoxMicsICcqMTMnLCAnKjE0JywgJyoxNScsICcqMTYnLCAnKjE3JywgJyoxOCcsICcqMTknLCAnKjIyJywgJyoyMycsICcqMjQnLCAnKjI1JywgJyoyNicsICcqMjcnLCAnKjI4JywgJyoyOScsICcqMzAnLCAnKjMxJywgJyozMicsICcqMzMnLCAnKjM0JywgJyozNScsICcqNEEnLCAnKjRCJ11cblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHNlbmREYXRhOiBmdW5jdGlvbihkYXRhVG9CZVNlbnQpIHtcbiAgICAgICAgICAgIC8vLmxvZyhkYXRhVG9CZVNlbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZVJlcG9ydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLiRkYXRhLmxvYWRpbmdfbW9kZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmdldEluZm8oKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHByaW50UmVwb3J0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdpbmRvdy5wcmludCgpOyAgXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ290b1RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwwKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnb3RvTmV3UmVwb3J0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgdGhpcy4kZGF0YS5kYXRhX2dhdGhlcmluZ19tb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGEubG9hZGluZ19tb2RlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRkYXRhLmVycm9yX2hhcHBlbmVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuZ290b1RvcCgpO1xuXG4gICAgICAgICAgICAvLyB0aGlzLnJlc2V0U2VsZWN0cygpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cblxuICAgICAgICByZXNldFNlbGVjdHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gYWxlcnQoXCJoaVwiKTtcbiAgICAgICAgICAgIC8vICQoJyNjeXAyZDZBbGwxJykuaGlkZSgpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgIC8vICQoJyNjeXAyZDZBbGwyJykuaGlkZSgpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgIC8vICQoJyNjeXAyYzE5QWxsMScpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgIC8vICQoJyNjeXAyYzE5QWxsMicpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgIC8vICQoJyNzYW1wbGVfdHlwZScpLnNlbGVjdDIoKTtcbiAgICAgICAgfSxcblxuXG4gICAgICAgIHNldERhdGE6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvL2FsZXJ0KFwiaGlcIik7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEucmVjb21tZW5kYXRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGEuQzE5UGhlbm90eXBlID0gcmVzcG9uc2UuZGF0YS5yZWNvbW1lbmRhdGlvbnMubWV0aGFib2xpemF0aW9uX3N0YXR1cy5DMTlQaGVub3R5cGU7XG4gICAgICAgICAgICB0aGlzLiRkYXRhLkQ2UGhlbm90eXBlID0gcmVzcG9uc2UuZGF0YS5yZWNvbW1lbmRhdGlvbnMubWV0aGFib2xpemF0aW9uX3N0YXR1cy5ENlBoZW5vdHlwZTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGEubWVkaWNpbmVfcmVjb21tZW5kYXRpb25zID0gcmVzcG9uc2UuZGF0YS5yZWNvbW1lbmRhdGlvbnMubWVkaWNpbmVfcmVjb21tZW5kYXRpb25zO1xuICAgICAgICAgICAgdGhpcy4kZGF0YS5yZXBvcnRfZ2VuZXJhdGVkID0gcmVzcG9uc2UuZGF0YS50aW1lO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyBcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwwKTtcbiAgICAgICAgICAgICB9LCA1MCk7XG5cbiAgICAgICAgICAgIFxuXG4gICAgICAgIH0sXG5cblxuICAgICAgICBnZXRJbmZvOiBmdW5jdGlvbihkYXRhVG9CZVNlbnQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY3lwMmMxOTpcIiArICB0aGlzLiRkYXRhLmN5cDJjMTlBbGwxICsgXCIvXCIgKyAgdGhpcy4kZGF0YS5jeXAyYzE5QWxsMiwgXG4gICAgICAgICAgICAvLyBcImN5cDJkNjpcIiArIHRoaXMuJGRhdGEuY3lwMmQ2QWxsMSArIFwiL1wiICsgIHRoaXMuJGRhdGEuY3lwMmQ2QWxsMiwgXG4gICAgICAgICAgICAvLyBcImhsYWE6XCIgKyB0aGlzLiRkYXRhLmhsYWFQbi50b0xvd2VyQ2FzZSgpLCBcImhsYWI6XCIgKyB0aGlzLiRkYXRhLmhsYWJQbi50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGF4aW9zXG4gICAgICAgICAgICAgICAgLnBvc3QoJ2h0dHBzOi8vZTBybzl5aWF1NS5leGVjdXRlLWFwaS5jYS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbS90ZXN0L3JlcG9ydCcsIFxuICAgICAgICAgICAgICAgIHtcImN5cDJjMTlcIjogdGhpcy4kZGF0YS5jeXAyYzE5QWxsMSArIFwiL1wiICsgIHRoaXMuJGRhdGEuY3lwMmMxOUFsbDIsIFxuICAgICAgICAgICAgICAgIFwiY3lwMmQ2XCI6IHRoaXMuJGRhdGEuY3lwMmQ2QWxsMSArIFwiL1wiICsgIHRoaXMuJGRhdGEuY3lwMmQ2QWxsMiwgXG4gICAgICAgICAgICAgICAgXCJobGFhXCI6IHRoaXMuJGRhdGEuaGxhYVBuLnRvTG93ZXJDYXNlKCksIFwiaGxhYlwiOiB0aGlzLiRkYXRhLmhsYWJQbi50b0xvd2VyQ2FzZSgpfSlcbiAgICAgICAgICAgXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIC8vIGFsZXJ0KHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgIGFwcC5zZXREYXRhKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBhcHAuJGRhdGEuZGF0YV9nYXRoZXJpbmdfbW9kZSA9IGZhbHNlXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiZXJyb3IhXCIpO1xuICAgICAgICAgICAgICAgIGFwcC4kZGF0YS5sb2FkaW5nX21vZGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBhcHAuJGRhdGEuZGF0YV9nYXRoZXJpbmdfbW9kZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYXBwLiRkYXRhLmVycm9yX2hhcHBlbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgJChcIiNlcnJvci1tc2ctaGVhZFwiKS5vZmZzZXQoKS50b3ApO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy90aGlzLiRkYXRhLmRhdGFfZ2F0aGVyaW5nX21vZGUgPSBmYWxzZVxuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIH0pO1xuICAgIC8vIGFwcC4kZGF0YS5yZXBvcnRfZ2VuZXJhdGVkID0gXCJNYXkgMTEsIDIwMTlcIjtcbiAgICBcblxuXG5cblxuICAgICQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIC8vIHZhciBzZWxlY3RpemUgPSAkKCcuYmVhc3RzLXNlbGVjdHMnKS5zZWxlY3RpemUoe1xuICAgICAgICAvLyAgICAgbWF4SXRlbXM6IDFcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgLy8gc2VsZWN0aXplLm9uKCdpdGVtX2FkZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gICAgIHNlbGVjdGl6ZS5jbG9zZSgpO1xuICAgICAgICAvLyAgIH0pO1xuXG5cbiAgICAgICAgLy8gdmFyIHJlc2V0U2VsZWN0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCgnI2N5cDJkNkFsbDEnKS5zZWxlY3QyKCk7XG4gICAgICAgICAgICAkKCcjY3lwMmQ2QWxsMicpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgICQoJyNjeXAyYzE5QWxsMScpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgICQoJyNjeXAyYzE5QWxsMicpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgICQoJyNzYW1wbGVfdHlwZScpLnNlbGVjdDIoKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIFxuXG5cblxuICAgICAgICAvLyAkKFwiI2dvdG9OZXdSZXBvcnRcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgIHJlc2V0U2VsZWN0cygpO1xuICAgICAgICAvLyAgICAgYXBwLiRkYXRhLmRhdGFfZ2F0aGVyaW5nX21vZGUgPSB0cnVlO1xuICAgICAgICAvLyB9KTtcblxuXG5cbiAgICAgICAgJCgnI2N5cDJjMTlBbGwyJykub24oJ3NlbGVjdDI6c2VsZWN0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGFwcC4kZGF0YS5jeXAyYzE5QWxsMiA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGFwcC4kZGF0YS5jeXAyYzE5QWxsMik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkKCcjY3lwMmMxOUFsbDEnKS5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgYXBwLiRkYXRhLmN5cDJjMTlBbGwxID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coYXBwLiRkYXRhLmN5cDJjMTlBbGwxKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICQoJyNjeXAyZDZBbGwxJykub24oJ3NlbGVjdDI6c2VsZWN0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGFwcC4kZGF0YS5jeXAyZDZBbGwxID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coYXBwLiRkYXRhLmN5cDJkNkFsbDEpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJCgnI2N5cDJkNkFsbDInKS5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgYXBwLiRkYXRhLmN5cDJkNkFsbDIgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhhcHAuJGRhdGEuY3lwMmQ2QWxsMik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkKCcjc2FtcGxlX3R5cGUnKS5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgYXBwLiRkYXRhLnNhbXBsZV90eXBlID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coYXBwLiRkYXRhLmN5cDJkNkFsbDIpO1xuICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgXG5cblxuICAgICAgICAkKCcuZHRwaWNrZXInKS5kYXRldGltZXBpY2tlcih7XG4gICAgICAgICAgICAvL2Zvcm1hdDogJ0xUJ1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZHBpY2tlcicpLmRhdGV0aW1lcGlja2VyKHtcbiAgICAgICAgICAgIGZvcm1hdDogJ0REL01NL1lZWVknXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgJChcIiN0b29sLWluZm8taFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJChcIiN0b29sLWluZm8tcFwiKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChcIiNidG4tZ2V0LXJlcG9ydFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCQoXCJmb3JtXCIpLnNlcmlhbGl6ZSgpKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJChcIiNiaXJ0aGRhdGVcIikudmFsKCkpO1xuICAgICAgICAgICAgLy9hcHAuc2VuZERhdGEoJChcImZvcm1cIikuc2VyaWFsaXplKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyB0aGlzLiRkYXRhLnNDb2xsZWN0ZWQgPSAkKFwiI3MtY29sbGVjdGVkLWR0XCIpLnZhbCgpLnJlcGxhY2UoXCIgXCIsIFwiIC0tIFwiKTtcbiAgICAgICAgLy8gICAgIHRoaXMuJGRhdGEuc1JlY2VpdmVkID0gJChcIiNzLXJlY2VpdmVkLWR0XCIpLnZhbCgpLnJlcGxhY2UoXCIgXCIsIFwiIC0tIFwiKTtcbiAgICAgICAgLy8gICAgIHRoaXMuJGRhdGEuc1JlY2VpdmVkID0gJChcIiNiaXJ0aGRhdGVcIikudmFsKCkucmVwbGFjZShcIiBcIiwgXCIgLS0gXCIpO1xuXG5cbiAgICAgICAgJChcIiNzLWNvbGxlY3RlZC1kdFwiKS5ibHVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXBwLiRkYXRhLnNDb2xsZWN0ZWQgPSAkKFwiI3MtY29sbGVjdGVkLWR0XCIpLnZhbCgpLnJlcGxhY2UoXCIgXCIsIFwiIC0tIFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChcIiNzLXJlY2VpdmVkLWR0XCIpLmJsdXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhcHAuJGRhdGEuc1JlY2VpdmVkID0gJChcIiNzLXJlY2VpdmVkLWR0XCIpLnZhbCgpLnJlcGxhY2UoXCIgXCIsIFwiIC0tIFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChcIiNiaXJ0aGRhdGVcIikuYmx1cihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFwcC4kZGF0YS5iaXJ0aGRhdGUgPSAkKFwiI2JpcnRoZGF0ZVwiKS52YWwoKS5yZXBsYWNlKFwiIFwiLCBcIiAtLSBcIik7XG4gICAgICAgIH0pO1xuICAgICAgICBcblxuICAgIH0pOyJdLCJmaWxlIjoiYXBwLmpzIn0=