var app = new Vue({
    el: '#seq2script',
    data: {
        data_gathering_mode: false,
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
        hlaaPn: "negative",
        hlabPn: "negative",
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
        cyp2d6All1_list: ['*1', '*2', '*3', '*4', '*5', '*6', '*7', '*8', '*9', '*10', '*11', '*12', '*13', '*14', '*15', '*17', '*18', '*19', '*20', '*21', '*22', '*23', '*24', '*25', '*26', '*27', '*28', '*29', '*30', '*31', '*32', '*33', '*34', '*35', '*36', '*37', '*38', '*39', '*40', '*41', '*42', '*43', '*44', '*45', '*46', '*47', '*48', '*49', '*50', '*51', '*52', '*53', '*54', '*55', '*56', '*57', '*58', '*59', '*60', '*61', '*62', '*63', '*64', '*65', '*68', '*69', '*70', '*71', '*72', '*73', '*74', '*75', '*81', '*82', '*83', '*84', '*85', '*86', '*87', '*88', '*89', '*90', '*91', '*92', '*93', '*94', '*95', '*96', '*97', '*98', '*99', '*100', '*101', '*102', '*103', '*104', '*105', '*106', '*107', '*108', '*109', '*110', '*111', '*112', '*113', '*114', '*45xN>2', '*6xN', '*35xN>2', '*10x2', '*1xN>2', '*41x2', '*45x2', '*35x2', '*29x2', '*43xN', '*17x2', '*4xN', '*2x2', '*9x2', '*36xN', '*2xN>2', '*1x2', '*3xN'],
        cyp2d6All2_list: ['*1', '*2', '*3', '*4', '*5', '*6', '*7', '*8', '*9', '*10', '*11', '*12', '*13', '*14', '*15', '*17', '*18', '*19', '*20', '*21', '*22', '*23', '*24', '*25', '*26', '*27', '*28', '*29', '*30', '*31', '*32', '*33', '*34', '*35', '*36', '*37', '*38', '*39', '*40', '*41', '*42', '*43', '*44', '*45', '*46', '*47', '*48', '*49', '*50', '*51', '*52', '*53', '*54', '*55', '*56', '*57', '*58', '*59', '*60', '*61', '*62', '*63', '*64', '*65', '*68', '*69', '*70', '*71', '*72', '*73', '*74', '*75', '*81', '*82', '*83', '*84', '*85', '*86', '*87', '*88', '*89', '*90', '*91', '*92', '*93', '*94', '*95', '*96', '*97', '*98', '*99', '*100', '*101', '*102', '*103', '*104', '*105', '*106', '*107', '*108', '*109', '*110', '*111', '*112', '*113', '*114', '*45xN>2', '*6xN', '*35xN>2', '*10x2', '*1xN>2', '*41x2', '*45x2', '*35x2', '*29x2', '*43xN', '*17x2', '*4xN', '*2x2', '*9x2', '*36xN', '*2xN>2', '*1x2', '*3xN'],
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

        raiseError: function() {
            app.$data.loading_mode = false;
            app.$data.data_gathering_mode = true;
            app.$data.error_happened = true;
            window.scrollTo(0, $("#error-msg-head").offset().top);
        },


        getInfo: function(dataToBeSent) {
            
            if(this.$data.cyp2c19All1 == "" || this.$data.cyp2c19All2 == "" || this.$data.cyp2d6All1 == ""
             || this.$data.cyp2d6All2 == "") {
                 app.raiseError();
                 return;
             }
            
            
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
                app.raiseError();

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


          var phn_last_len = 0;


          $("#phn").on("keyup", function() {



            if($(this).val().length == 5) {
                if($(this).val().length >= phn_last_len) {
                    $(this).val($(this).val() + "-");
                }
            }
            phn_last_len = $(this).val().length;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IG5ldyBWdWUoe1xuICAgIGVsOiAnI3NlcTJzY3JpcHQnLFxuICAgIGRhdGE6IHtcbiAgICAgICAgZGF0YV9nYXRoZXJpbmdfbW9kZTogZmFsc2UsXG4gICAgICAgIGxvYWRpbmdfbW9kZTogZmFsc2UsXG4gICAgICAgIHJlcG9ydF9nZW5lcmF0ZWQ6IFwiXCIsXG4gICAgICAgIGVycm9yX2hhcHBlbmVkOiBmYWxzZSxcbiAgICAgICAgaW5mbzogXCJcIixcbiAgICAgICAgcmVjZWl2ZWRfZHQ6IFwiXCIsXG4gICAgICAgIGNvbGxlY3RlZF9kdDogXCJcIixcbiAgICAgICAgc2FtcGxlX3R5cGU6IFwiXCIsXG4gICAgICAgIGZpcnN0TmFtZTogXCJcIixcbiAgICAgICAgbGFzdE5hbWU6IFwiXCIsXG4gICAgICAgIGJpcnRoZGF0ZTogXCJcIixcbiAgICAgICAgcGhuOiBcIlwiLFxuICAgICAgICBtcm46IFwiXCIsXG4gICAgICAgIHNleDogXCJtYWxlXCIsXG4gICAgICAgIHNDb2xsZWN0ZWQ6IFwiXCIsXG4gICAgICAgIHNSZWNlaXZlZDogXCJcIixcbiAgICAgICAgY3lwMmQ2QWxsMTogXCJcIixcbiAgICAgICAgY3lwMmQ2QWxsMjogXCJcIixcbiAgICAgICAgY3lwMmMxOUFsbDE6IFwiXCIsXG4gICAgICAgIGN5cDJjMTlBbGwyOiBcIlwiLFxuICAgICAgICBobGFhUG46IFwibmVnYXRpdmVcIixcbiAgICAgICAgaGxhYlBuOiBcIm5lZ2F0aXZlXCIsXG4gICAgICAgIHJlZmVycmluZ0RpYWc6IFwiXCIsXG4gICAgICAgIHJlZmVycmluZ0NsaW5pY2lhbjogXCJcIixcbiAgICAgICAgcmVmZXJyaW5nQ2xpbmljOiBcIlwiLFxuICAgICAgICBsYWJOYW1lOiBcIlwiLFxuICAgICAgICBsYWJBZGRyMTogXCJcIixcbiAgICAgICAgbGFiQWRkcjI6IFwiXCIsXG4gICAgICAgIGNpdHk6IFwiXCIsXG4gICAgICAgIHByb3ZpbmNlOiBcIlwiLFxuICAgICAgICBwb3N0YWxDb2RlOiBcIlwiLFxuICAgICAgICByZXBvcnRfZ2VuZXJhdGVkOiBcIlwiLFxuICAgICAgICBkYXRhVG9CZVNlbnQ6IFwiXCIsXG4gICAgICAgIEQ2UGhlbm90eXBlOiBcIlwiLFxuICAgICAgICBDMTlQaGVub3R5cGU6IFwiXCIsXG4gICAgICAgIG1lZGljaW5lX3JlY29tbWVuZGF0aW9uczogW10sXG4gICAgICAgIGN5cDJkNkFsbDFfbGlzdDogWycqMScsICcqMicsICcqMycsICcqNCcsICcqNScsICcqNicsICcqNycsICcqOCcsICcqOScsICcqMTAnLCAnKjExJywgJyoxMicsICcqMTMnLCAnKjE0JywgJyoxNScsICcqMTcnLCAnKjE4JywgJyoxOScsICcqMjAnLCAnKjIxJywgJyoyMicsICcqMjMnLCAnKjI0JywgJyoyNScsICcqMjYnLCAnKjI3JywgJyoyOCcsICcqMjknLCAnKjMwJywgJyozMScsICcqMzInLCAnKjMzJywgJyozNCcsICcqMzUnLCAnKjM2JywgJyozNycsICcqMzgnLCAnKjM5JywgJyo0MCcsICcqNDEnLCAnKjQyJywgJyo0MycsICcqNDQnLCAnKjQ1JywgJyo0NicsICcqNDcnLCAnKjQ4JywgJyo0OScsICcqNTAnLCAnKjUxJywgJyo1MicsICcqNTMnLCAnKjU0JywgJyo1NScsICcqNTYnLCAnKjU3JywgJyo1OCcsICcqNTknLCAnKjYwJywgJyo2MScsICcqNjInLCAnKjYzJywgJyo2NCcsICcqNjUnLCAnKjY4JywgJyo2OScsICcqNzAnLCAnKjcxJywgJyo3MicsICcqNzMnLCAnKjc0JywgJyo3NScsICcqODEnLCAnKjgyJywgJyo4MycsICcqODQnLCAnKjg1JywgJyo4NicsICcqODcnLCAnKjg4JywgJyo4OScsICcqOTAnLCAnKjkxJywgJyo5MicsICcqOTMnLCAnKjk0JywgJyo5NScsICcqOTYnLCAnKjk3JywgJyo5OCcsICcqOTknLCAnKjEwMCcsICcqMTAxJywgJyoxMDInLCAnKjEwMycsICcqMTA0JywgJyoxMDUnLCAnKjEwNicsICcqMTA3JywgJyoxMDgnLCAnKjEwOScsICcqMTEwJywgJyoxMTEnLCAnKjExMicsICcqMTEzJywgJyoxMTQnLCAnKjQ1eE4+MicsICcqNnhOJywgJyozNXhOPjInLCAnKjEweDInLCAnKjF4Tj4yJywgJyo0MXgyJywgJyo0NXgyJywgJyozNXgyJywgJyoyOXgyJywgJyo0M3hOJywgJyoxN3gyJywgJyo0eE4nLCAnKjJ4MicsICcqOXgyJywgJyozNnhOJywgJyoyeE4+MicsICcqMXgyJywgJyozeE4nXSxcbiAgICAgICAgY3lwMmQ2QWxsMl9saXN0OiBbJyoxJywgJyoyJywgJyozJywgJyo0JywgJyo1JywgJyo2JywgJyo3JywgJyo4JywgJyo5JywgJyoxMCcsICcqMTEnLCAnKjEyJywgJyoxMycsICcqMTQnLCAnKjE1JywgJyoxNycsICcqMTgnLCAnKjE5JywgJyoyMCcsICcqMjEnLCAnKjIyJywgJyoyMycsICcqMjQnLCAnKjI1JywgJyoyNicsICcqMjcnLCAnKjI4JywgJyoyOScsICcqMzAnLCAnKjMxJywgJyozMicsICcqMzMnLCAnKjM0JywgJyozNScsICcqMzYnLCAnKjM3JywgJyozOCcsICcqMzknLCAnKjQwJywgJyo0MScsICcqNDInLCAnKjQzJywgJyo0NCcsICcqNDUnLCAnKjQ2JywgJyo0NycsICcqNDgnLCAnKjQ5JywgJyo1MCcsICcqNTEnLCAnKjUyJywgJyo1MycsICcqNTQnLCAnKjU1JywgJyo1NicsICcqNTcnLCAnKjU4JywgJyo1OScsICcqNjAnLCAnKjYxJywgJyo2MicsICcqNjMnLCAnKjY0JywgJyo2NScsICcqNjgnLCAnKjY5JywgJyo3MCcsICcqNzEnLCAnKjcyJywgJyo3MycsICcqNzQnLCAnKjc1JywgJyo4MScsICcqODInLCAnKjgzJywgJyo4NCcsICcqODUnLCAnKjg2JywgJyo4NycsICcqODgnLCAnKjg5JywgJyo5MCcsICcqOTEnLCAnKjkyJywgJyo5MycsICcqOTQnLCAnKjk1JywgJyo5NicsICcqOTcnLCAnKjk4JywgJyo5OScsICcqMTAwJywgJyoxMDEnLCAnKjEwMicsICcqMTAzJywgJyoxMDQnLCAnKjEwNScsICcqMTA2JywgJyoxMDcnLCAnKjEwOCcsICcqMTA5JywgJyoxMTAnLCAnKjExMScsICcqMTEyJywgJyoxMTMnLCAnKjExNCcsICcqNDV4Tj4yJywgJyo2eE4nLCAnKjM1eE4+MicsICcqMTB4MicsICcqMXhOPjInLCAnKjQxeDInLCAnKjQ1eDInLCAnKjM1eDInLCAnKjI5eDInLCAnKjQzeE4nLCAnKjE3eDInLCAnKjR4TicsICcqMngyJywgJyo5eDInLCAnKjM2eE4nLCAnKjJ4Tj4yJywgJyoxeDInLCAnKjN4TiddLFxuICAgICAgICBjeXAyYzE5QWxsMV9saXN0OiBbJyoxJywgJyoyJywgJyozJywgJyo1JywgJyo2JywgJyo3JywgJyo4JywgJyo5JywgJyoxMCcsICcqMTEnLCAnKjEyJywgJyoxMycsICcqMTQnLCAnKjE1JywgJyoxNicsICcqMTcnLCAnKjE4JywgJyoxOScsICcqMjInLCAnKjIzJywgJyoyNCcsICcqMjUnLCAnKjI2JywgJyoyNycsICcqMjgnLCAnKjI5JywgJyozMCcsICcqMzEnLCAnKjMyJywgJyozMycsICcqMzQnLCAnKjM1JywgJyo0QScsICcqNEInXSxcbiAgICAgICAgY3lwMmMxOUFsbDJfbGlzdDogWycqMScsICcqMicsICcqMycsICcqNScsICcqNicsICcqNycsICcqOCcsICcqOScsICcqMTAnLCAnKjExJywgJyoxMicsICcqMTMnLCAnKjE0JywgJyoxNScsICcqMTYnLCAnKjE3JywgJyoxOCcsICcqMTknLCAnKjIyJywgJyoyMycsICcqMjQnLCAnKjI1JywgJyoyNicsICcqMjcnLCAnKjI4JywgJyoyOScsICcqMzAnLCAnKjMxJywgJyozMicsICcqMzMnLCAnKjM0JywgJyozNScsICcqNEEnLCAnKjRCJ11cblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG4gICAgICAgIHNlbmREYXRhOiBmdW5jdGlvbihkYXRhVG9CZVNlbnQpIHtcbiAgICAgICAgICAgIC8vLmxvZyhkYXRhVG9CZVNlbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZVJlcG9ydDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLiRkYXRhLmxvYWRpbmdfbW9kZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmdldEluZm8oKTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHByaW50UmVwb3J0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdpbmRvdy5wcmludCgpOyAgXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ290b1RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwwKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnb3RvTmV3UmVwb3J0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgdGhpcy4kZGF0YS5kYXRhX2dhdGhlcmluZ19tb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGEubG9hZGluZ19tb2RlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRkYXRhLmVycm9yX2hhcHBlbmVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuZ290b1RvcCgpO1xuXG4gICAgICAgICAgICAvLyB0aGlzLnJlc2V0U2VsZWN0cygpO1xuICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cblxuICAgICAgICByZXNldFNlbGVjdHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gYWxlcnQoXCJoaVwiKTtcbiAgICAgICAgICAgIC8vICQoJyNjeXAyZDZBbGwxJykuaGlkZSgpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgIC8vICQoJyNjeXAyZDZBbGwyJykuaGlkZSgpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgIC8vICQoJyNjeXAyYzE5QWxsMScpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgIC8vICQoJyNjeXAyYzE5QWxsMicpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgIC8vICQoJyNzYW1wbGVfdHlwZScpLnNlbGVjdDIoKTtcbiAgICAgICAgfSxcblxuXG4gICAgICAgIHNldERhdGE6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvL2FsZXJ0KFwiaGlcIik7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEucmVjb21tZW5kYXRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGEuQzE5UGhlbm90eXBlID0gcmVzcG9uc2UuZGF0YS5yZWNvbW1lbmRhdGlvbnMubWV0aGFib2xpemF0aW9uX3N0YXR1cy5DMTlQaGVub3R5cGU7XG4gICAgICAgICAgICB0aGlzLiRkYXRhLkQ2UGhlbm90eXBlID0gcmVzcG9uc2UuZGF0YS5yZWNvbW1lbmRhdGlvbnMubWV0aGFib2xpemF0aW9uX3N0YXR1cy5ENlBoZW5vdHlwZTtcbiAgICAgICAgICAgIHRoaXMuJGRhdGEubWVkaWNpbmVfcmVjb21tZW5kYXRpb25zID0gcmVzcG9uc2UuZGF0YS5yZWNvbW1lbmRhdGlvbnMubWVkaWNpbmVfcmVjb21tZW5kYXRpb25zO1xuICAgICAgICAgICAgdGhpcy4kZGF0YS5yZXBvcnRfZ2VuZXJhdGVkID0gcmVzcG9uc2UuZGF0YS50aW1lO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyBcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwwKTtcbiAgICAgICAgICAgICB9LCA1MCk7XG5cbiAgICAgICAgICAgIFxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmFpc2VFcnJvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhcHAuJGRhdGEubG9hZGluZ19tb2RlID0gZmFsc2U7XG4gICAgICAgICAgICBhcHAuJGRhdGEuZGF0YV9nYXRoZXJpbmdfbW9kZSA9IHRydWU7XG4gICAgICAgICAgICBhcHAuJGRhdGEuZXJyb3JfaGFwcGVuZWQgPSB0cnVlO1xuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsICQoXCIjZXJyb3ItbXNnLWhlYWRcIikub2Zmc2V0KCkudG9wKTtcbiAgICAgICAgfSxcblxuXG4gICAgICAgIGdldEluZm86IGZ1bmN0aW9uKGRhdGFUb0JlU2VudCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0aGlzLiRkYXRhLmN5cDJjMTlBbGwxID09IFwiXCIgfHwgdGhpcy4kZGF0YS5jeXAyYzE5QWxsMiA9PSBcIlwiIHx8IHRoaXMuJGRhdGEuY3lwMmQ2QWxsMSA9PSBcIlwiXG4gICAgICAgICAgICAgfHwgdGhpcy4kZGF0YS5jeXAyZDZBbGwyID09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgYXBwLnJhaXNlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBheGlvc1xuICAgICAgICAgICAgICAgIC5wb3N0KCdodHRwczovL2Uwcm85eWlhdTUuZXhlY3V0ZS1hcGkuY2EtY2VudHJhbC0xLmFtYXpvbmF3cy5jb20vdGVzdC9yZXBvcnQnLCBcbiAgICAgICAgICAgICAgICB7XCJjeXAyYzE5XCI6IHRoaXMuJGRhdGEuY3lwMmMxOUFsbDEgKyBcIi9cIiArICB0aGlzLiRkYXRhLmN5cDJjMTlBbGwyLCBcbiAgICAgICAgICAgICAgICBcImN5cDJkNlwiOiB0aGlzLiRkYXRhLmN5cDJkNkFsbDEgKyBcIi9cIiArICB0aGlzLiRkYXRhLmN5cDJkNkFsbDIsIFxuICAgICAgICAgICAgICAgIFwiaGxhYVwiOiB0aGlzLiRkYXRhLmhsYWFQbi50b0xvd2VyQ2FzZSgpLCBcImhsYWJcIjogdGhpcy4kZGF0YS5obGFiUG4udG9Mb3dlckNhc2UoKX0pXG4gICAgICAgICAgIFxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAvLyBhbGVydChyZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICBhcHAuc2V0RGF0YShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgYXBwLiRkYXRhLmRhdGFfZ2F0aGVyaW5nX21vZGUgPSBmYWxzZVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgLy9hbGVydChcImVycm9yIVwiKTtcbiAgICAgICAgICAgICAgICBhcHAucmFpc2VFcnJvcigpO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy90aGlzLiRkYXRhLmRhdGFfZ2F0aGVyaW5nX21vZGUgPSBmYWxzZVxuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIH0pO1xuICAgIC8vIGFwcC4kZGF0YS5yZXBvcnRfZ2VuZXJhdGVkID0gXCJNYXkgMTEsIDIwMTlcIjtcbiAgICBcblxuXG5cblxuICAgICQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIC8vIHZhciBzZWxlY3RpemUgPSAkKCcuYmVhc3RzLXNlbGVjdHMnKS5zZWxlY3RpemUoe1xuICAgICAgICAvLyAgICAgbWF4SXRlbXM6IDFcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgLy8gc2VsZWN0aXplLm9uKCdpdGVtX2FkZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gICAgIHNlbGVjdGl6ZS5jbG9zZSgpO1xuICAgICAgICAvLyAgIH0pO1xuXG5cbiAgICAgICAgLy8gdmFyIHJlc2V0U2VsZWN0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCgnI2N5cDJkNkFsbDEnKS5zZWxlY3QyKCk7XG4gICAgICAgICAgICAkKCcjY3lwMmQ2QWxsMicpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgICQoJyNjeXAyYzE5QWxsMScpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgICQoJyNjeXAyYzE5QWxsMicpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgICQoJyNzYW1wbGVfdHlwZScpLnNlbGVjdDIoKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIFxuXG5cblxuICAgICAgICAvLyAkKFwiI2dvdG9OZXdSZXBvcnRcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gICAgIHJlc2V0U2VsZWN0cygpO1xuICAgICAgICAvLyAgICAgYXBwLiRkYXRhLmRhdGFfZ2F0aGVyaW5nX21vZGUgPSB0cnVlO1xuICAgICAgICAvLyB9KTtcblxuXG5cbiAgICAgICAgJCgnI2N5cDJjMTlBbGwyJykub24oJ3NlbGVjdDI6c2VsZWN0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGFwcC4kZGF0YS5jeXAyYzE5QWxsMiA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGFwcC4kZGF0YS5jeXAyYzE5QWxsMik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkKCcjY3lwMmMxOUFsbDEnKS5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgYXBwLiRkYXRhLmN5cDJjMTlBbGwxID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coYXBwLiRkYXRhLmN5cDJjMTlBbGwxKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICQoJyNjeXAyZDZBbGwxJykub24oJ3NlbGVjdDI6c2VsZWN0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGFwcC4kZGF0YS5jeXAyZDZBbGwxID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coYXBwLiRkYXRhLmN5cDJkNkFsbDEpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJCgnI2N5cDJkNkFsbDInKS5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgYXBwLiRkYXRhLmN5cDJkNkFsbDIgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhhcHAuJGRhdGEuY3lwMmQ2QWxsMik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkKCcjc2FtcGxlX3R5cGUnKS5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgYXBwLiRkYXRhLnNhbXBsZV90eXBlID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coYXBwLiRkYXRhLmN5cDJkNkFsbDIpO1xuICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICB2YXIgcGhuX2xhc3RfbGVuID0gMDtcblxuXG4gICAgICAgICAgJChcIiNwaG5cIikub24oXCJrZXl1cFwiLCBmdW5jdGlvbigpIHtcblxuXG5cbiAgICAgICAgICAgIGlmKCQodGhpcykudmFsKCkubGVuZ3RoID09IDUpIHtcbiAgICAgICAgICAgICAgICBpZigkKHRoaXMpLnZhbCgpLmxlbmd0aCA+PSBwaG5fbGFzdF9sZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS52YWwoJCh0aGlzKS52YWwoKSArIFwiLVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwaG5fbGFzdF9sZW4gPSAkKHRoaXMpLnZhbCgpLmxlbmd0aDtcblxuICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgXG5cblxuICAgICAgICAkKCcuZHRwaWNrZXInKS5kYXRldGltZXBpY2tlcih7XG4gICAgICAgICAgICAvL2Zvcm1hdDogJ0xUJ1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZHBpY2tlcicpLmRhdGV0aW1lcGlja2VyKHtcbiAgICAgICAgICAgIGZvcm1hdDogJ0REL01NL1lZWVknXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgJChcIiN0b29sLWluZm8taFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJChcIiN0b29sLWluZm8tcFwiKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChcIiNidG4tZ2V0LXJlcG9ydFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCQoXCJmb3JtXCIpLnNlcmlhbGl6ZSgpKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJChcIiNiaXJ0aGRhdGVcIikudmFsKCkpO1xuICAgICAgICAgICAgLy9hcHAuc2VuZERhdGEoJChcImZvcm1cIikuc2VyaWFsaXplKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyB0aGlzLiRkYXRhLnNDb2xsZWN0ZWQgPSAkKFwiI3MtY29sbGVjdGVkLWR0XCIpLnZhbCgpLnJlcGxhY2UoXCIgXCIsIFwiIC0tIFwiKTtcbiAgICAgICAgLy8gICAgIHRoaXMuJGRhdGEuc1JlY2VpdmVkID0gJChcIiNzLXJlY2VpdmVkLWR0XCIpLnZhbCgpLnJlcGxhY2UoXCIgXCIsIFwiIC0tIFwiKTtcbiAgICAgICAgLy8gICAgIHRoaXMuJGRhdGEuc1JlY2VpdmVkID0gJChcIiNiaXJ0aGRhdGVcIikudmFsKCkucmVwbGFjZShcIiBcIiwgXCIgLS0gXCIpO1xuXG5cbiAgICAgICAgJChcIiNzLWNvbGxlY3RlZC1kdFwiKS5ibHVyKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXBwLiRkYXRhLnNDb2xsZWN0ZWQgPSAkKFwiI3MtY29sbGVjdGVkLWR0XCIpLnZhbCgpLnJlcGxhY2UoXCIgXCIsIFwiIC0tIFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChcIiNzLXJlY2VpdmVkLWR0XCIpLmJsdXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhcHAuJGRhdGEuc1JlY2VpdmVkID0gJChcIiNzLXJlY2VpdmVkLWR0XCIpLnZhbCgpLnJlcGxhY2UoXCIgXCIsIFwiIC0tIFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChcIiNiaXJ0aGRhdGVcIikuYmx1cihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFwcC4kZGF0YS5iaXJ0aGRhdGUgPSAkKFwiI2JpcnRoZGF0ZVwiKS52YWwoKS5yZXBsYWNlKFwiIFwiLCBcIiAtLSBcIik7XG4gICAgICAgIH0pO1xuICAgICAgICBcblxuICAgIH0pOyJdLCJmaWxlIjoiYXBwLmpzIn0=