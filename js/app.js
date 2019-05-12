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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IG5ldyBWdWUoe1xuICAgIGVsOiAnI3NlcTJzY3JpcHQnLFxuICAgIGRhdGE6IHtcbiAgICAgICAgZGF0YV9nYXRoZXJpbmdfbW9kZTogdHJ1ZSxcbiAgICAgICAgbG9hZGluZ19tb2RlOiBmYWxzZSxcbiAgICAgICAgcmVwb3J0X2dlbmVyYXRlZDogXCJcIixcbiAgICAgICAgZXJyb3JfaGFwcGVuZWQ6IGZhbHNlLFxuICAgICAgICBpbmZvOiBcIlwiLFxuICAgICAgICByZWNlaXZlZF9kdDogXCJcIixcbiAgICAgICAgY29sbGVjdGVkX2R0OiBcIlwiLFxuICAgICAgICBzYW1wbGVfdHlwZTogXCJcIixcbiAgICAgICAgZmlyc3ROYW1lOiBcIlwiLFxuICAgICAgICBsYXN0TmFtZTogXCJcIixcbiAgICAgICAgYmlydGhkYXRlOiBcIlwiLFxuICAgICAgICBwaG46IFwiXCIsXG4gICAgICAgIG1ybjogXCJcIixcbiAgICAgICAgc2V4OiBcIm1hbGVcIixcbiAgICAgICAgc0NvbGxlY3RlZDogXCJcIixcbiAgICAgICAgc1JlY2VpdmVkOiBcIlwiLFxuICAgICAgICBjeXAyZDZBbGwxOiBcIlwiLFxuICAgICAgICBjeXAyZDZBbGwyOiBcIlwiLFxuICAgICAgICBjeXAyYzE5QWxsMTogXCJcIixcbiAgICAgICAgY3lwMmMxOUFsbDI6IFwiXCIsXG4gICAgICAgIGhsYWFQbjogXCJwb3NpdGl2ZVwiLFxuICAgICAgICBobGFiUG46IFwicG9zaXRpdmVcIixcbiAgICAgICAgcmVmZXJyaW5nRGlhZzogXCJcIixcbiAgICAgICAgcmVmZXJyaW5nQ2xpbmljaWFuOiBcIlwiLFxuICAgICAgICByZWZlcnJpbmdDbGluaWM6IFwiXCIsXG4gICAgICAgIGxhYk5hbWU6IFwiXCIsXG4gICAgICAgIGxhYkFkZHIxOiBcIlwiLFxuICAgICAgICBsYWJBZGRyMjogXCJcIixcbiAgICAgICAgY2l0eTogXCJcIixcbiAgICAgICAgcHJvdmluY2U6IFwiXCIsXG4gICAgICAgIHBvc3RhbENvZGU6IFwiXCIsXG4gICAgICAgIHJlcG9ydF9nZW5lcmF0ZWQ6IFwiXCIsXG4gICAgICAgIGRhdGFUb0JlU2VudDogXCJcIixcbiAgICAgICAgRDZQaGVub3R5cGU6IFwiXCIsXG4gICAgICAgIEMxOVBoZW5vdHlwZTogXCJcIixcbiAgICAgICAgbWVkaWNpbmVfcmVjb21tZW5kYXRpb25zOiBbXSxcbiAgICAgICAgY3lwMmQ2QWxsMV9saXN0OiBbJyoxJywgJyoyJywgJyAqMicsICcqMycsICcqNCcsICcqNScsICcqNicsICcqNycsICcqOCcsICcqOScsICcqMTAnLCAnKjExJywgJyoxMicsICcqMTMnLCAnKjE0JywgJyoxNScsICcqMTcnLCAnKjE4JywgJyoxOScsICcqMjAnLCAnKjIxJywgJyoyMicsICcqMjMnLCAnKjI0JywgJyoyNScsICcqMjYnLCAnKjI3JywgJyoyOCcsICcqMjknLCAnKjMwJywgJyozMScsICcqMzInLCAnKjMzJywgJyozNCcsICcqMzUnLCAnKjM2JywgJyozNycsICcqMzgnLCAnKjM5JywgJyo0MCcsICcqNDEnLCAnKjQyJywgJyo0MycsICcqNDQnLCAnKjQ1JywgJyo0NicsICcqNDcnLCAnKjQ4JywgJyo0OScsICcqNTAnLCAnKjUxJywgJyo1MicsICcqNTMnLCAnKjU0JywgJyo1NScsICcqNTYnLCAnKjU3JywgJyo1OCcsICcqNTknLCAnKjYwJywgJyo2MScsICcqNjInLCAnKjYzJywgJyo2NCcsICcqNjUnLCAnKjY4JywgJyo2OScsICcqNzAnLCAnKjcxJywgJyo3MicsICcqNzMnLCAnKjc0JywgJyo3NScsICcqODEnLCAnKjgyJywgJyo4MycsICcqODQnLCAnKjg1JywgJyo4NicsICcqODcnLCAnKjg4JywgJyo4OScsICcqOTAnLCAnKjkxJywgJyo5MicsICcqOTMnLCAnKjk0JywgJyo5NScsICcqOTYnLCAnKjk3JywgJyo5OCcsICcqOTknLCAnKjEwMCcsICcqMTAxJywgJyoxMDInLCAnKjEwMycsICcqMTA0JywgJyoxMDUnLCAnKjEwNicsICcqMTA3JywgJyoxMDgnLCAnKjEwOScsICcqMTEwJywgJyoxMTEnLCAnKjExMicsICcqMTEzJywgJyoxMTQnLCAnKjQ1eE4+MicsICcqNnhOJywgJyozNXhOPjInLCAnKjEweDInLCAnKjF4Tj4yJywgJyo0MXgyJywgJyo0NXgyJywgJyozNXgyJywgJyoyOXgyJywgJyo0M3hOJywgJyoyICcsICcqMTd4MicsICcqNHhOJywgJyoyeDInLCAnKjl4MicsICcqMzZ4TicsICcqMnhOPjInLCAnKjF4MicsICcqM3hOJ10sXG4gICAgICAgIGN5cDJkNkFsbDJfbGlzdDogWycqMScsICcqMicsICcgKjInLCAnKjMnLCAnKjQnLCAnKjUnLCAnKjYnLCAnKjcnLCAnKjgnLCAnKjknLCAnKjEwJywgJyoxMScsICcqMTInLCAnKjEzJywgJyoxNCcsICcqMTUnLCAnKjE3JywgJyoxOCcsICcqMTknLCAnKjIwJywgJyoyMScsICcqMjInLCAnKjIzJywgJyoyNCcsICcqMjUnLCAnKjI2JywgJyoyNycsICcqMjgnLCAnKjI5JywgJyozMCcsICcqMzEnLCAnKjMyJywgJyozMycsICcqMzQnLCAnKjM1JywgJyozNicsICcqMzcnLCAnKjM4JywgJyozOScsICcqNDAnLCAnKjQxJywgJyo0MicsICcqNDMnLCAnKjQ0JywgJyo0NScsICcqNDYnLCAnKjQ3JywgJyo0OCcsICcqNDknLCAnKjUwJywgJyo1MScsICcqNTInLCAnKjUzJywgJyo1NCcsICcqNTUnLCAnKjU2JywgJyo1NycsICcqNTgnLCAnKjU5JywgJyo2MCcsICcqNjEnLCAnKjYyJywgJyo2MycsICcqNjQnLCAnKjY1JywgJyo2OCcsICcqNjknLCAnKjcwJywgJyo3MScsICcqNzInLCAnKjczJywgJyo3NCcsICcqNzUnLCAnKjgxJywgJyo4MicsICcqODMnLCAnKjg0JywgJyo4NScsICcqODYnLCAnKjg3JywgJyo4OCcsICcqODknLCAnKjkwJywgJyo5MScsICcqOTInLCAnKjkzJywgJyo5NCcsICcqOTUnLCAnKjk2JywgJyo5NycsICcqOTgnLCAnKjk5JywgJyoxMDAnLCAnKjEwMScsICcqMTAyJywgJyoxMDMnLCAnKjEwNCcsICcqMTA1JywgJyoxMDYnLCAnKjEwNycsICcqMTA4JywgJyoxMDknLCAnKjExMCcsICcqMTExJywgJyoxMTInLCAnKjExMycsICcqMTE0JywgJyo0NXhOPjInLCAnKjZ4TicsICcqMzV4Tj4yJywgJyoxMHgyJywgJyoxeE4+MicsICcqNDF4MicsICcqNDV4MicsICcqMzV4MicsICcqMjl4MicsICcqNDN4TicsICcqMiAnLCAnKjE3eDInLCAnKjR4TicsICcqMngyJywgJyo5eDInLCAnKjM2eE4nLCAnKjJ4Tj4yJywgJyoxeDInLCAnKjN4TiddLFxuICAgICAgICBjeXAyYzE5QWxsMV9saXN0OiBbJyoxJywgJyoyJywgJyozJywgJyo1JywgJyo2JywgJyo3JywgJyo4JywgJyo5JywgJyoxMCcsICcqMTEnLCAnKjEyJywgJyoxMycsICcqMTQnLCAnKjE1JywgJyoxNicsICcqMTcnLCAnKjE4JywgJyoxOScsICcqMjInLCAnKjIzJywgJyoyNCcsICcqMjUnLCAnKjI2JywgJyoyNycsICcqMjgnLCAnKjI5JywgJyozMCcsICcqMzEnLCAnKjMyJywgJyozMycsICcqMzQnLCAnKjM1JywgJyo0QScsICcqNEInXSxcbiAgICAgICAgY3lwMmMxOUFsbDJfbGlzdDogWycqMScsICcqMicsICcqMycsICcqNScsICcqNicsICcqNycsICcqOCcsICcqOScsICcqMTAnLCAnKjExJywgJyoxMicsICcqMTMnLCAnKjE0JywgJyoxNScsICcqMTYnLCAnKjE3JywgJyoxOCcsICcqMTknLCAnKjIyJywgJyoyMycsICcqMjQnLCAnKjI1JywgJyoyNicsICcqMjcnLCAnKjI4JywgJyoyOScsICcqMzAnLCAnKjMxJywgJyozMicsICcqMzMnLCAnKjM0JywgJyozNScsICcqNEEnLCAnKjRCJ11cblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHNlbmREYXRhOiBmdW5jdGlvbihkYXRhVG9CZVNlbnQpIHtcbiAgICAgICAgICAgIC8vLmxvZyhkYXRhVG9CZVNlbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZVJlcG9ydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLiRkYXRhLmxvYWRpbmdfbW9kZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmdldEluZm8oKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHByaW50UmVwb3J0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdpbmRvdy5wcmludCgpOyAgXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ290b1RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwwKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnb3RvTmV3UmVwb3J0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgdGhpcy4kZGF0YS5kYXRhX2dhdGhlcmluZ19tb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGEubG9hZGluZ19tb2RlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRkYXRhLmVycm9yX2hhcHBlbmVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuZ290b1RvcCgpO1xuXG4gICAgICAgICAgICAvLyB0aGlzLnJlc2V0U2VsZWN0cygpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cblxuICAgICAgICByZXNldFNlbGVjdHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gYWxlcnQoXCJoaVwiKTtcbiAgICAgICAgICAgIC8vICQoJyNjeXAyZDZBbGwxJykuaGlkZSgpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgIC8vICQoJyNjeXAyZDZBbGwyJykuaGlkZSgpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgIC8vICQoJyNjeXAyYzE5QWxsMScpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgIC8vICQoJyNjeXAyYzE5QWxsMicpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgIC8vICQoJyNzYW1wbGVfdHlwZScpLnNlbGVjdDIoKTtcbiAgICAgICAgfSxcblxuXG4gICAgICAgIHNldERhdGE6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvL2FsZXJ0KFwiaGlcIik7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEucmVjb21tZW5kYXRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGEuQzE5UGhlbm90eXBlID0gcmVzcG9uc2UuZGF0YS5yZWNvbW1lbmRhdGlvbnMubWV0aGFib2xpemF0aW9uX3N0YXR1cy5DMTlQaGVub3R5cGU7XG4gICAgICAgICAgICB0aGlzLiRkYXRhLkQ2UGhlbm90eXBlID0gcmVzcG9uc2UuZGF0YS5yZWNvbW1lbmRhdGlvbnMubWV0aGFib2xpemF0aW9uX3N0YXR1cy5ENlBoZW5vdHlwZTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGEubWVkaWNpbmVfcmVjb21tZW5kYXRpb25zID0gcmVzcG9uc2UuZGF0YS5yZWNvbW1lbmRhdGlvbnMubWVkaWNpbmVfcmVjb21tZW5kYXRpb25zO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IFxuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLDApO1xuICAgICAgICAgICAgIH0sIDUwKTtcblxuICAgICAgICAgICAgXG5cbiAgICAgICAgfSxcblxuXG4gICAgICAgIGdldEluZm86IGZ1bmN0aW9uKGRhdGFUb0JlU2VudCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJjeXAyYzE5OlwiICsgIHRoaXMuJGRhdGEuY3lwMmMxOUFsbDEgKyBcIi9cIiArICB0aGlzLiRkYXRhLmN5cDJjMTlBbGwyLCBcbiAgICAgICAgICAgIC8vIFwiY3lwMmQ2OlwiICsgdGhpcy4kZGF0YS5jeXAyZDZBbGwxICsgXCIvXCIgKyAgdGhpcy4kZGF0YS5jeXAyZDZBbGwyLCBcbiAgICAgICAgICAgIC8vIFwiaGxhYTpcIiArIHRoaXMuJGRhdGEuaGxhYVBuLnRvTG93ZXJDYXNlKCksIFwiaGxhYjpcIiArIHRoaXMuJGRhdGEuaGxhYlBuLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYXhpb3NcbiAgICAgICAgICAgICAgICAucG9zdCgnaHR0cHM6Ly9lMHJvOXlpYXU1LmV4ZWN1dGUtYXBpLmNhLWNlbnRyYWwtMS5hbWF6b25hd3MuY29tL3Rlc3QvcmVwb3J0JywgXG4gICAgICAgICAgICAgICAge1wiY3lwMmMxOVwiOiB0aGlzLiRkYXRhLmN5cDJjMTlBbGwxICsgXCIvXCIgKyAgdGhpcy4kZGF0YS5jeXAyYzE5QWxsMiwgXG4gICAgICAgICAgICAgICAgXCJjeXAyZDZcIjogdGhpcy4kZGF0YS5jeXAyZDZBbGwxICsgXCIvXCIgKyAgdGhpcy4kZGF0YS5jeXAyZDZBbGwyLCBcbiAgICAgICAgICAgICAgICBcImhsYWFcIjogdGhpcy4kZGF0YS5obGFhUG4udG9Mb3dlckNhc2UoKSwgXCJobGFiXCI6IHRoaXMuJGRhdGEuaGxhYlBuLnRvTG93ZXJDYXNlKCl9KVxuICAgICAgICAgICBcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgLy8gYWxlcnQocmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgYXBwLnNldERhdGEocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGFwcC4kZGF0YS5kYXRhX2dhdGhlcmluZ19tb2RlID0gZmFsc2VcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCJlcnJvciFcIik7XG4gICAgICAgICAgICAgICAgYXBwLiRkYXRhLmxvYWRpbmdfbW9kZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGFwcC4kZGF0YS5kYXRhX2dhdGhlcmluZ19tb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhcHAuJGRhdGEuZXJyb3JfaGFwcGVuZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAkKFwiI2Vycm9yLW1zZy1oZWFkXCIpLm9mZnNldCgpLnRvcCk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL3RoaXMuJGRhdGEuZGF0YV9nYXRoZXJpbmdfbW9kZSA9IGZhbHNlXG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgfSk7XG4gICAgLy8gYXBwLiRkYXRhLnJlcG9ydF9nZW5lcmF0ZWQgPSBcIk1heSAxMSwgMjAxOVwiO1xuICAgIFxuXG5cblxuXG4gICAgJChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgLy8gdmFyIHNlbGVjdGl6ZSA9ICQoJy5iZWFzdHMtc2VsZWN0cycpLnNlbGVjdGl6ZSh7XG4gICAgICAgIC8vICAgICBtYXhJdGVtczogMVxuICAgICAgICAvLyB9KTtcblxuICAgICAgICAvLyBzZWxlY3RpemUub24oJ2l0ZW1fYWRkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgICAgc2VsZWN0aXplLmNsb3NlKCk7XG4gICAgICAgIC8vICAgfSk7XG5cblxuICAgICAgICAvLyB2YXIgcmVzZXRTZWxlY3RzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKCcjY3lwMmQ2QWxsMScpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgICQoJyNjeXAyZDZBbGwyJykuc2VsZWN0MigpO1xuICAgICAgICAgICAgJCgnI2N5cDJjMTlBbGwxJykuc2VsZWN0MigpO1xuICAgICAgICAgICAgJCgnI2N5cDJjMTlBbGwyJykuc2VsZWN0MigpO1xuICAgICAgICAgICAgJCgnI3NhbXBsZV90eXBlJykuc2VsZWN0MigpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgXG5cblxuXG4gICAgICAgIC8vICQoXCIjZ290b05ld1JlcG9ydFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAgICAgcmVzZXRTZWxlY3RzKCk7XG4gICAgICAgIC8vICAgICBhcHAuJGRhdGEuZGF0YV9nYXRoZXJpbmdfbW9kZSA9IHRydWU7XG4gICAgICAgIC8vIH0pO1xuXG5cblxuICAgICAgICAkKCcjY3lwMmMxOUFsbDInKS5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgYXBwLiRkYXRhLmN5cDJjMTlBbGwyID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coYXBwLiRkYXRhLmN5cDJjMTlBbGwyKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICQoJyNjeXAyYzE5QWxsMScpLm9uKCdzZWxlY3QyOnNlbGVjdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBhcHAuJGRhdGEuY3lwMmMxOUFsbDEgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhhcHAuJGRhdGEuY3lwMmMxOUFsbDEpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJCgnI2N5cDJkNkFsbDEnKS5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgYXBwLiRkYXRhLmN5cDJkNkFsbDEgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhhcHAuJGRhdGEuY3lwMmQ2QWxsMSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkKCcjY3lwMmQ2QWxsMicpLm9uKCdzZWxlY3QyOnNlbGVjdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBhcHAuJGRhdGEuY3lwMmQ2QWxsMiA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGFwcC4kZGF0YS5jeXAyZDZBbGwyKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICQoJyNzYW1wbGVfdHlwZScpLm9uKCdzZWxlY3QyOnNlbGVjdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBhcHAuJGRhdGEuc2FtcGxlX3R5cGUgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhhcHAuJGRhdGEuY3lwMmQ2QWxsMik7XG4gICAgICAgICAgfSk7XG5cblxuICAgICAgICBcblxuXG4gICAgICAgICQoJy5kdHBpY2tlcicpLmRhdGV0aW1lcGlja2VyKHtcbiAgICAgICAgICAgIC8vZm9ybWF0OiAnTFQnXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5kcGlja2VyJykuZGF0ZXRpbWVwaWNrZXIoe1xuICAgICAgICAgICAgZm9ybWF0OiAnREQvTU0vWVlZWSdcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAkKFwiI3Rvb2wtaW5mby1oXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKFwiI3Rvb2wtaW5mby1wXCIpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKFwiI2J0bi1nZXQtcmVwb3J0XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJChcImZvcm1cIikuc2VyaWFsaXplKCkpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygkKFwiI2JpcnRoZGF0ZVwiKS52YWwoKSk7XG4gICAgICAgICAgICAvL2FwcC5zZW5kRGF0YSgkKFwiZm9ybVwiKS5zZXJpYWxpemUoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRoaXMuJGRhdGEuc0NvbGxlY3RlZCA9ICQoXCIjcy1jb2xsZWN0ZWQtZHRcIikudmFsKCkucmVwbGFjZShcIiBcIiwgXCIgLS0gXCIpO1xuICAgICAgICAvLyAgICAgdGhpcy4kZGF0YS5zUmVjZWl2ZWQgPSAkKFwiI3MtcmVjZWl2ZWQtZHRcIikudmFsKCkucmVwbGFjZShcIiBcIiwgXCIgLS0gXCIpO1xuICAgICAgICAvLyAgICAgdGhpcy4kZGF0YS5zUmVjZWl2ZWQgPSAkKFwiI2JpcnRoZGF0ZVwiKS52YWwoKS5yZXBsYWNlKFwiIFwiLCBcIiAtLSBcIik7XG5cblxuICAgICAgICAkKFwiI3MtY29sbGVjdGVkLWR0XCIpLmJsdXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhcHAuJGRhdGEuc0NvbGxlY3RlZCA9ICQoXCIjcy1jb2xsZWN0ZWQtZHRcIikudmFsKCkucmVwbGFjZShcIiBcIiwgXCIgLS0gXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKFwiI3MtcmVjZWl2ZWQtZHRcIikuYmx1cihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFwcC4kZGF0YS5zUmVjZWl2ZWQgPSAkKFwiI3MtcmVjZWl2ZWQtZHRcIikudmFsKCkucmVwbGFjZShcIiBcIiwgXCIgLS0gXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKFwiI2JpcnRoZGF0ZVwiKS5ibHVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXBwLiRkYXRhLmJpcnRoZGF0ZSA9ICQoXCIjYmlydGhkYXRlXCIpLnZhbCgpLnJlcGxhY2UoXCIgXCIsIFwiIC0tIFwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuXG4gICAgfSk7Il0sImZpbGUiOiJhcHAuanMifQ==