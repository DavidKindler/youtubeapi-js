(function($){
  'use strict'
    try {
            // Load youtube iframe API script
            var head = document.getElementsByTagName('head')[0]
            var script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = 'https://www.youtube.com/iframe_api'
            head.appendChild(script)
            /**
             * iFrame API (for iframe videos)
             * onYouTubeIframeAPIReady is called for each player when it is ready
             */
            window.onYouTubeIframeAPIReady = function () {

                $('iframe[src*="youtube"]').each(function () {
                    var iframe = $(this)
                    var iframeSrc = iframe.attr('src')
                    // enable youtube api
                    iframe.attr('src', iframeSrc + '?enablejsapi=1')
                    // get the player(s)
                    var player = new YT.Player(iframe[0], {
                        events: {
                            'onReady': function (e) {
                                console.log('YouTube player \'' + iframeSrc + '\': ready')
                                e.target._donecheck = true
                            },
                            'onStateChange': function (e) {
                                onStateChange(iframe, e)
                            }
                        }
                    })
                })
            }

            /* execute the API calls for play, pause, and finish */
            window.onStateChange = function (iframe, state) {
                if (state.data === 0) {
                    onFinish(iframe)
                } else if (state.data === 1) {
                    onPlay(iframe)
                } else if (state.data === 2) {
                    onPause(iframe)
                }
            }

            /* for each of the above three states, make a custom event */
            window.onPause = function (iframe) {
                console.log('YouTube player \'' + iframe.attr('src') + '\': pause')
                // Video has paused.
            }

            window.onFinish = function (iframe) {
                console.log('YouTube player \'' + iframe.attr('src') + '\': finish')
                // Video has finished
            }

            window.onPlay = function (iframe) {
                console.log('YouTube player \'' + iframe.attr('src') + '\': play')
                // Video is being played
            }

    } catch (err){
      console.error('ERROR::', err)
    }
})(jQuery)
