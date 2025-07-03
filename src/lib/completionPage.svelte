<script>
    let { scene = $bindable() } = $props();
</script>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Thank You for Participating!</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: "Trebuchet MS", "Lucida Sans Unicode",
                    "Lucida Grande", "Lucida Sans", Arial, sans-serif;
                background-color: #f8fafc;
                color: rgb(24, 24, 24);
                line-height: 1.4;
                min-height: 100vh;
            }

            #fullscreen-page {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                text-align: center;
                max-width: 90%;
            }

            h1 {
                font-size: 3rem;
                margin-bottom: 3rem;
                color: rgb(0, 0, 0);
            }

            p {
                font-size: 1.5rem;
                margin-bottom: 2rem;
                color: #475569;
            }

            .email-link {
                color: #3b82f6;
                text-decoration: none;
                font-weight: 500;
            }

            .email-link:hover {
                text-decoration: underline;
            }

            .button-container {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
                margin-top: 2rem;
            }

            button {
                font-family: "Trebuchet MS", "Lucida Sans Unicode",
                    "Lucida Grande", "Lucida Sans", Arial, sans-serif;
                font-size: 2.5rem;
                padding: 1.5rem;
                background-color: rgb(109, 179, 236);
                border-style: solid;
                border-width: 0.4rem;
                border-radius: 0.5rem;
                border-color: rgb(26, 104, 168);
                cursor: pointer;
                color: black;
                text-decoration: none;
                display: inline-block;
                transition: background-color 0.2s ease;
            }

            button:hover {
                background: rgb(26, 104, 168);
            }

            .btn-link {
                font-family: "Trebuchet MS", "Lucida Sans Unicode",
                    "Lucida Grande", "Lucida Sans", Arial, sans-serif;
                font-size: 1.5rem;
                padding: 1rem 1.5rem;
                background-color: rgb(109, 179, 236);
                border-style: solid;
                border-width: 0.3rem;
                border-radius: 0.5rem;
                border-color: rgb(26, 104, 168);
                cursor: pointer;
                color: black;
                text-decoration: none;
                display: inline-block;
                transition: background-color 0.2s ease;
            }

            .btn-link:hover {
                background: rgb(26, 104, 168);
            }

            @media (max-width: 640px) {
                h1 {
                    font-size: 2rem;
                }

                button {
                    font-size: 2.5rem;
                }

                .btn-link {
                    font-size: 1.25rem;
                }

                .button-container {
                    flex-direction: column;
                    align-items: center;
                }
            }
        </style>
    </head>
    <body>
        <div id="fullscreen-page">
            <h1>Thank you for participating in the experiment!</h1>
            <p>
                Please email the project coordinator at
                <a href="mailto:digitallearninglab@uci.edu" class="email-link"
                    >digitallearninglab@uci.edu</a
                >
                to tell them you have completed the study. You may close out the
                browser tab. Feel free to check out our lab and project websites
                for more related research:
            </p>

            <div class="button-container">
                <a
                    href="https://digitallearninglab.org"
                    class="btn-link"
                    target="_blank"
                    rel="noopener"
                >
                    Digital Learning Lab
                </a>
                <a
                    href="https://conversetolearn.org"
                    class="btn-link"
                    target="_blank"
                    rel="noopener"
                >
                    Converse to Learn
                </a>
            </div>
        </div>
    </body>
</html>
