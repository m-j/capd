function showHideCheckboxToggledContent() {

  $(".block-label input[type='checkbox']").each(function() {

    var $checkbox = $(this);
    var $checkboxLabel = $(this).parent();

    var $dataTarget = $checkboxLabel.attr('data-target');

    // Add ARIA attributes

    // If the data-target attribute is defined
    if (typeof $dataTarget !== 'undefined' && $dataTarget !== false) {

      // Set aria-controls
      $checkbox.attr('aria-controls', $dataTarget);

      // Set aria-expanded and aria-hidden
      $checkbox.attr('aria-expanded', 'false');
      $('#'+$dataTarget).attr('aria-hidden', 'true');

      // For checkboxes revealing hidden content
      $checkbox.on('click', function() {

        var state = $(this).attr('aria-expanded') === 'false' ? true : false;

        // Toggle hidden content
        $('#'+$dataTarget).toggle();

        // Update aria-expanded and aria-hidden attributes
        $(this).attr('aria-expanded', state);
        $('#'+$dataTarget).attr('aria-hidden', !state);

      });
    }

  });

}

function showHideRadioToggledContent() {

  $(".block-label input[type='radio']").each(function() {

    var $radio = $(this);
    var $radioGroupName = $(this).attr('name');
    var $radioLabel = $(this).parent();

    var $dataTarget = $radioLabel.attr('data-target');

    // Add ARIA attributes

    // If the data-target attribute is defined
    if (typeof $dataTarget !== 'undefined' && $dataTarget !== false) {

      // Set aria-controls
      $radio.attr('aria-controls', $dataTarget);

      // Set aria-expanded and aria-hidden
      $radio.attr('aria-expanded', 'false');
      $('#'+$dataTarget).attr('aria-hidden', 'true');

      // For radio buttons revealing hidden content
      $radio.on('click', function() {

        var state = $(this).attr('aria-expanded') === 'false' ? true : false;

        // Toggle hidden content
        $('#'+$dataTarget).toggle();

        // Update aria-expanded and aria-hidden attributes
        $(this).attr('aria-expanded', state);
        $('#'+$dataTarget).attr('aria-hidden', !state);

      });
    }

    // If the data-target attribute is undefined for a radio button,
    // hide visible data-target content for radio buttons in the same group
    else {

      $radio.on('click', function() {

        // Select radio buttons in the same group
        $(".block-label input[name=" + $radioGroupName + "]").each(function() {

          var groupDataTarget = $(this).parent().attr('data-target');

          // Hide toggled content
          $('#'+groupDataTarget).hide();

          // Update aria-expanded and aria-hidden attributes
          if ($(this).attr('aria-controls')) {
            $(this).attr('aria-expanded', 'false');
          }
          $('#'+groupDataTarget).attr('aria-hidden', 'true');

        });

      });
    }

  });

}


function toggleTabs() {

  if ($('.tabs').length>0) {

    $('.tabs').tabs();

  }

}



function formMultipleCheckboxes() {


  if ($('.form-checkboxes').length > 0) {

    $('.form-checkboxes > li').on('click', function(event) {

      var target   = $(event.target);
      var checkbox = $(this).find("input[type='checkbox']");

        if (target.is("input[type='checkbox']")) {

            if ($(this).hasClass('selected')) {

                $(this).removeClass('selected');
                $(this).removeClass('focused');

            } else {

                $(this).addClass('selected');
                $(this).addClass('focused');
            }

            return;
        }

      event.preventDefault();

      if (!checkbox.prop('checked')) {

        $(this).addClass('selected');
        $(this).addClass('focused');

        checkbox.prop('checked', true);

      } else {

        $(this).removeClass('selected');
        $(this).removeClass('focused');

        checkbox.prop('checked', false);

      }

    });

  }

}



function formValidation() {

  $('.validation-list a[href^="#"]').on('click', function(e) {

		e.preventDefault();

		// Declare variables
		var link = $(this),
			id   = link.attr('href');

		// Get focus
		$(id).focus();

		// Smooth movement to error
		$('html, body').animate({

		scrollTop: ($(id).offset().top) - 20

		}, 500);

	});

}


$(document).ready(function() {

  // Turn off jQuery animation
  jQuery.fx.off = true;

  // Use GOV.UK selection-buttons.js to set selected
  // and focused states for block labels
  var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']");

  GOVUK.selectionButtons($blockLabels);

  // Details/summary polyfill
  // See /javascripts/vendor/details.polyfill.js

  // Where .block-label uses the data-target attribute
  // to toggle hidden content

  showHideCheckboxToggledContent();
  showHideRadioToggledContent();

  toggleTabs();
  formValidation();
  formMultipleCheckboxes();

});